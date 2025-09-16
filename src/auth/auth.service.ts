import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { CreateUserDto, SignInDto, User } from "src/users/user.entity";
import { UsersService } from "src/users/users.service";
import * as bcrypt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {}

  async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  async comparePassword(plainPassword: string, hashedPassword: string) {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
  async generateTokken(userId: number, email: string) {
    const payload = { sub: userId, email };
    return {
      acessTokken: this.jwtService.sign(payload, { expiresIn: "15m" }),
      refreshTokken: this.jwtService.sign(payload, { expiresIn: "7d" }),
    };
  }

  async signUp(createUserDto: CreateUserDto) {
    const existingUser = await this.userService.findUserByEmail(
      createUserDto.email
    );

    if (existingUser != null) {
      throw new ConflictException("User already exists");
    } else {
      const hashedPassword = await this.hashPassword(createUserDto.password);
      const user = { ...createUserDto, password: hashedPassword };
      const savedUser = await this.userService.createUser(user);
      return this.generateTokken(savedUser.id, user.email);
    }
  }
  async login(signInDto: SignInDto) {
    const user = await this.userService.findUserByEmail(signInDto.email);
    if (user == null) {
      throw new NotFoundException("User does not exist");
    }

    const isPasswordValid = await this.comparePassword(
      signInDto.password,
      user.password
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid password");
    }
    return this.generateTokken(user.id, user.email);
  }
}
