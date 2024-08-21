import { Body, Controller, BadRequestException, Inject, Post, UseGuards, Patch, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/interfaces/user.interface';
import { AuthGuard } from '@nestjs/passport';
import { ChangePassword } from 'src/interfaces/changepassword.interface';
import { Request } from 'express';
import { CheckToken } from 'src/interfaces/checkToken.interface';
import { Login } from 'src/interfaces/login.interface';

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

    @Post('login')
    // @UseGuards(AuthGuard('local'))
    async login(@Body() data: Login) {
        let dataLogin = await this.authService.login(data);
        let keys = Object.keys(dataLogin);
        if (keys.includes("error")) {
            throw new BadRequestException({ message: dataLogin['error'] })
        }
        return dataLogin
    }

    @Patch('change-password')
    @UseGuards(AuthGuard('jwt'))
    async changePassword(@Body() data: ChangePassword) {
        let dataChange = await this.authService.changePassword(data);
        let keys = Object.keys(dataChange);
        if (keys.includes("error")) {
            throw new BadRequestException({ message: dataChange['error'] })
        }
        return dataChange
    }

    @Put("forget-password")
    async forgetPassword(@Body() body: any) {
        let dataR = await this.authService.forgetPassword(body.email);
        let keys = Object.keys(dataR);
        if (keys.includes("error")) {
            throw new BadRequestException({ message: dataR['error'] })
        }
        return dataR
    }

    @Put("reset-password")
    async resetPassword(@Body() data: CheckToken) {
        let dataR = await this.authService.checkToken(data);
        let keys = Object.keys(dataR);
        if (keys.includes("error")) {
            throw new BadRequestException({ message: dataR['error'] })
        }
        return dataR
    }
}
