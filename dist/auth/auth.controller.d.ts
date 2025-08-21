import { AuthService } from './auth.service';
import { CreateUserDto, SignInDto } from 'src/users/user.entity';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signUp(createUserDto: CreateUserDto): Promise<import("src/users/user.entity").ResponseUserDto>;
    signIn(signInDto: SignInDto): Promise<import("src/users/user.entity").ResponseUserDto>;
}
