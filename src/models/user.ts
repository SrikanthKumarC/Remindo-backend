import mongoose from "mongoose";

export interface IUser extends mongoose.Document{
  email: string;
  password: string;
  phoneNumber?: string;
  refreshToken?: string;
  userTier?: string;
  subscription?: string;
  subscriptionDate?: Date;
  availableEvents: number;
}
// create a mongo model

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      unique: true,
    },
    refreshToken: {
      type: String,
    },
    userTier: {
      type: String,
      enum: ["free", "premium", "admin"],
      default: "free",
    },
    subscription: {
      type: String,
      enum: ["monthly", "yearly"],
    },
    subscriptionDate: {
      type: Date,
    },
    availableEvents: {
      type: Number,
      default: 2,
    },
  },
  { timestamps: true },
);

// hanlde unique email error
userSchema.post("save", function (error: any, doc: any, next: any) {
  if (error.name === "MongoError" && error.code === 11000) {
    next(new Error("Email already exists"));
  } else {
    next();
  }
});

const User = mongoose.model("User", userSchema);

export default User;
