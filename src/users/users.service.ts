import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
  CreateUserDto,
  ResponseUserDto,
  UpdateUserDto,
  User,
} from "./user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const user = await this.userRepository.save(createUserDto);
    return this.toResponseUserDto(user);
  }

  async findAllUsers() {
    const users = await this.userRepository.find();
    return users.map((user) => this.toResponseUserDto(user));
  }

  async findUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email: email },
    });
    return user;
  }

  async findUserById(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return this.toResponseUserDto(user);
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException("User not found");
    }
    await this.userRepository.update(id, updateUserDto);
    return this.toResponseUserDto(user);
  }

  toResponseUserDto(user: User): ResponseUserDto {
    const { id, firstName, lastName, email, createdAt, updatedAt } = user;
    const responseUserDto: ResponseUserDto = {
      id,
      firstName,
      lastName,
      email,
    };
    return responseUserDto;
  }
}
