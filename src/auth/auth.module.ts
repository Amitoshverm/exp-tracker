import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UsersModule } from "src/users/users.module";
import { JwtStrategy } from "./jwt.strategy";
import { JwtAuthGuard } from "./jwt-guard.gurad";

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: "SECRET_KEY",
      signOptions: { expiresIn: "15m" },
    }),
  ],
  providers: [AuthService, JwtStrategy, JwtAuthGuard],
  controllers: [AuthController],
  exports: [AuthService, JwtAuthGuard],
})
export class AuthModule {}
