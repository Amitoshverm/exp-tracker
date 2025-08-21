import { CreateUserDto, SignInDto } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
export declare class AuthService {
    private userService;
    constructor(userService: UsersService);
    hashPassword(password: string): Promise<string>;
    comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean>;
    signUp(createUserDto: CreateUserDto): Promise<import("src/users/user.entity").ResponseUserDto>;
    signIn(signInDto: SignInDto): Promise<import("src/users/user.entity").ResponseUserDto>;
}
