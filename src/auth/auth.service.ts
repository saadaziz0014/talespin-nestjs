import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from 'src/interfaces/user.interface';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Login } from 'src/interfaces/login.interface';
import { ChangePassword } from 'src/interfaces/changepassword.interface';
import { VerifyPassword } from 'src/interfaces/verifyPassword.interface';
import { CheckToken } from 'src/interfaces/checkToken.interface';

@Injectable()
export class AuthService {

    constructor(

        @Inject("USER_MODEL")
        private userModel: Model<User>,
        @Inject("VERIFY_PASSWORD_MODEL")
        private verifyPasswordModel: Model<VerifyPassword>,
        private jwtService: JwtService
    ) { }

    async register(user: User): Promise<any> {
        let exist = await this.userModel.findOne({ email: user.email });
        if (exist) {
            return { error: "Email Exist" }
        }
        let hashPassword = await bcrypt.hash(user.password, 10);
        const newUser = new this.userModel({ ...user, password: hashPassword });
        return await newUser.save();
    }

    async login(user: Login): Promise<any> {
        let findUser = await this.userModel.findOne({ email: user.email });
        if (!findUser) {
            return { error: "User not found" };
        }
        let match = await bcrypt.compare(user.password, findUser.password);
        if (!match) {
            return { error: "Password not match" };
        }
        let payload = { email: findUser.email, name: findUser.name, id: findUser._id };
        return {
            token: this.jwtService.sign(payload),
            payload
        }
    }
    async changePassword(data: ChangePassword) {
        let findUser = await this.userModel.findOne({ email: data.email });
        if (!findUser) {
            return { error: "User not found" };
        }
        let match = await bcrypt.compare(data.oldPassword, findUser.password);
        if (!match) {
            return { error: "Password not match" };
        }
        let hashPassword = await bcrypt.hash(data.newPassword, 10);
        let updatedUser = await this.userModel.findOneAndUpdate({ email: data.email }, { password: hashPassword }, { new: true });
        return updatedUser
    }

    async forgetPassword(email: string) {
        let findUser = await this.userModel.findOne({ email: email });
        if (!findUser) {
            return { error: "User not found" };
        }
        let token = Math.random().toString(36).slice(-8);
        let addToken = await this.verifyPasswordModel.create({ email: email, token: token, date: new Date() });
        //TODO: email sending logic here
        return addToken
    }

    async checkToken(data: CheckToken): Promise<any> {
        let findToken = await this.verifyPasswordModel.findOne({ email: data.email, token: data.token });
        if (!findToken) {
            return { error: "Token not match" };
        }
        let fiveMinutes = 1000 * 60 * 5;
        let timeDiff = new Date().getTime() - findToken.date.getTime();
        if (timeDiff > fiveMinutes) {
            return { error: "Token expired" };
        }
        let hashPassword = await bcrypt.hash(data.password, 10);
        let updatedUser = await this.userModel.findOneAndUpdate({ email: data.email }, { password: hashPassword }, { new: true });
        return updatedUser
    }

}
