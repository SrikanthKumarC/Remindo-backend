import mongoose from "mongoose";

export interface IUser {
  email: string;
  password: string;
  phoneNumber?: string;
}
// create a mongo model

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      unique: true,
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
