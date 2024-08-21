import { Document } from "mongoose";

export interface VerifyPassword extends Document {
    email: string;
    token: string;
    date: Date
}