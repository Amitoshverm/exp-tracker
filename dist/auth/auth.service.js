"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const bcrypt = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    userService;
    jwtService;
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async hashPassword(password) {
        return bcrypt.hash(password, 10);
    }
    async comparePassword(plainPassword, hashedPassword) {
        return bcrypt.compare(plainPassword, hashedPassword);
    }
    async generateTokken(userId, email) {
        const payload = { sub: userId, email };
        return {
            acessTokken: this.jwtService.sign(payload, { expiresIn: "15m" }),
            refreshTokken: this.jwtService.sign(payload, { expiresIn: "7d" }),
        };
    }
    async signUp(createUserDto) {
        const existingUser = await this.userService.findUserByEmail(createUserDto.email);
        if (existingUser != null) {
            throw new common_1.ConflictException("User already exists");
        }
        else {
            const hashedPassword = await this.hashPassword(createUserDto.password);
            const user = { ...createUserDto, password: hashedPassword };
            const savedUser = await this.userService.createUser(user);
            return this.generateTokken(savedUser.id, user.email);
        }
    }
    async login(signInDto) {
        const user = await this.userService.findUserByEmail(signInDto.email);
        if (user == null) {
            throw new common_1.NotFoundException("User does not exist");
        }
        const isPasswordValid = await this.comparePassword(signInDto.password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException("Invalid password");
        }
        return this.generateTokken(user.id, user.email);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map