import { Body, Controller, BadRequestException, Inject, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/interfaces/user.interface';

@Controller('auth')
export class AuthController {

    constructor(
        @Inject()
        private authService: AuthService
    ) { }

    @Post('register')
    async register(@Body() user: User) {
        let data = await this.authService.register(user);
        let keys = Object.keys(data);
        if (keys.includes("error")) {
            throw new BadRequestException({ message: data['error'] })
        }
        return data;
    }
}
