import { Body, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "src/auth/auth.service";
import { Login } from "src/interfaces/login.interface";
import { Strategy } from "passport-local";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super();
    }

    async validate(@Body() user: Login): Promise<any> {
        let data = await this.authService.login(user);
        let keys = Object.keys(data);
        if (keys.includes("error")) {
            throw new UnauthorizedException();
        }
        return data;
    }
}