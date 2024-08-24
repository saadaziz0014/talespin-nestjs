import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Tale } from 'src/interfaces/tale.interface';
import { User } from 'src/interfaces/user.interface';

@Injectable()
export class TaleService {

    constructor(

        @Inject("TALE_MODEL")
        private taleModel: Model<Tale>,
        @Inject("USER_MODEL")
        private userModel: Model<User>,
    ) { }

    async createTale(tale: Tale, id: string): Promise<any> {
        let findUser = await this.userModel.findOne({ _id: id });
        if (!findUser) {
            return { error: "User not found" };
        }
        let addTale = await this.taleModel.create({ ...tale, author: id });
        return addTale;
    }

    async updateTale(tale: Tale, id: string, userId: string): Promise<any> {
        let findTale = await this.taleModel.findOne({ _id: id, author: userId });
        if (!findTale) {
            return { error: "Tale not found" };
        }
        let updateTale = await this.taleModel.findOneAndUpdate({ _id: id }, tale, { new: true });
        return updateTale;
    }

    async allTales(): Promise<any> {
        let allTales = await this.taleModel.find({ isDeleted: false }).populate({ path: "author", select: "name email _id" });
        return allTales;
    }

    async deleteTale(id: string, userId: string): Promise<any> {
        let findTale = await this.taleModel.findOne({ _id: id, author: userId });
        if (!findTale) {
            return { error: "Tale not found" };
        }
        let deleteTale = await this.taleModel.findOneAndUpdate({ _id: id }, { isDeleted: true }, { new: true });
        return deleteTale;
    }

    async viewTale(id: string, userId: string): Promise<any> {
        let findTale = await this.taleModel.findOne({ _id: id });
        if (!findTale) {
            return { error: "Tale not found" };
        }
        if (findTale.author.toString() == userId) {
            return findTale;
        }
        let existUser = findTale.views.find((user) => user.toString() == userId);
        if (!existUser) {
            let updateTale = await this.taleModel.findOneAndUpdate({ _id: id }, { $push: { views: userId } }, { new: true });
            return updateTale;
        }
    }
}
