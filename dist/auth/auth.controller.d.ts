import { AuthService } from "./auth.service";
import { CreateUserDto, SignInDto } from "src/users/user.entity";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signUp(createUserDto: CreateUserDto): Promise<{
        acessTokken: string;
        refreshTokken: string;
    }>;
    signIn(signInDto: SignInDto): Promise<{
        acessTokken: string;
        refreshTokken: string;
    }>;
}
