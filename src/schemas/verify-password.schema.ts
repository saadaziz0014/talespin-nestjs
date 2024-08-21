import { Schema } from "mongoose";

export const verifyPasswordSchema = new Schema({
    email: { type: String },
    token: { type: String },
    date: { type: Date }
}, { timestamps: true })