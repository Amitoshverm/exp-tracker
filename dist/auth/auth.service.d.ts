import { CreateUserDto, SignInDto } from "src/users/user.entity";
import { UsersService } from "src/users/users.service";
import { JwtService } from "@nestjs/jwt";
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UsersService, jwtService: JwtService);
    hashPassword(password: string): Promise<string>;
    comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean>;
    generateTokken(userId: number, email: string): Promise<{
        acessTokken: string;
        refreshTokken: string;
    }>;
    signUp(createUserDto: CreateUserDto): Promise<{
        acessTokken: string;
        refreshTokken: string;
    }>;
    login(signInDto: SignInDto): Promise<{
        acessTokken: string;
        refreshTokken: string;
    }>;
}
