import { CreateUserDto, ResponseUserDto, UpdateUserDto, User } from './user.entity';
import { Repository } from 'typeorm';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    createUser(createUserDto: CreateUserDto): Promise<ResponseUserDto>;
    findAllUsers(): Promise<ResponseUserDto[]>;
    findUserByEmail(email: string): Promise<User | null>;
    findUserById(id: number): Promise<ResponseUserDto>;
    updateUser(id: number, updateUserDto: UpdateUserDto): Promise<ResponseUserDto>;
    toResponseUserDto(user: User): ResponseUserDto;
}
