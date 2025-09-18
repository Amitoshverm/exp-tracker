import { UsersService } from "./users.service";
export declare class UsersController {
    private userService;
    constructor(userService: UsersService);
    getUsers(): Promise<import("./user.entity").ResponseUserDto[]>;
    getUserById(id: number): Promise<import("./user.entity").ResponseUserDto>;
}
