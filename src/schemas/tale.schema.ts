import mongoose, { Schema } from "mongoose";

export const taleSchema = new Schema({
    title: { type: String },
    description: { type: String },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    views: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    isDeleted: { type: Boolean, default: false },
    isDeletedByAdmin: { type: Boolean, default: false },
}, { timestamps: true })