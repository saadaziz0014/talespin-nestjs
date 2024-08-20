import { Schema } from "mongoose";

export const userSchema = new Schema({
    name: { type: String, trim: true },
    email: { type: String, unique: [true, 'Email already exists'] },
    password: String
}, { timestamps: true })