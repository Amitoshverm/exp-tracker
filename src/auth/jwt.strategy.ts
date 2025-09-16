import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "src/users/users.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "SECRET_KEY",
    });
  }

  async validate(payload: any) {
    const user = await this.usersService.findUserByEmail(payload.email);
    if (!user) {
      throw new UnauthorizedException("User not found");
    }
    return { userId: payload.sub, email: payload.email };
  }
}
