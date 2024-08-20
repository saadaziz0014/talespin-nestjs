import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from 'src/interfaces/user.interface';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {

    constructor(

        @Inject("USER_MODEL")
        private userModel: Model<User>
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
}
