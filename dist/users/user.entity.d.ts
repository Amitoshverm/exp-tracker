export declare class User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare class CreateUserDto {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}
export declare class ResponseUserDto {
    id?: number;
    email?: string;
    firstName?: string;
    lastName?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare class UpdateUserDto {
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
}
export declare class SignInDto {
    email: string;
    password: string;
}
