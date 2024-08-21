import { Document } from "mongoose";

export interface Tale extends Document {
    readonly title: string;
    readonly description: string;
}