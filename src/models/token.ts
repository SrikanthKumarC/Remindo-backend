import mongoose from "mongoose";

export interface IToken extends mongoose.Document {
  token: string;
  userId: string;
}

const tokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 1800,
  },
});

const Token = mongoose.model<IToken>("Token", tokenSchema);

export default Token;