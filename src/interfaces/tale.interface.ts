import { Document } from "mongoose";

export interface Tale extends Document {
    readonly title: string;
    readonly description: string;
    readonly author: string;
    readonly views: any[];
}