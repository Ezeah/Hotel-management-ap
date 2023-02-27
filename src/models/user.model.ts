import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { model, Schema } from "mongoose";
import validator from "validator";
import IUser from "../interfaces/user.interface";
import IUserModel from "../interfaces/userModel.interface";

const userSchema: Schema<IUser> = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value: string) {
        const isValidUsername = validator.isAlphanumeric(value);
        if (!isValidUsername) {
          const errorMessage = "Username is invalid";
          throw new Error(errorMessage);
        }
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value: string) {
        const isValidEmail = validator.isEmail(value);
        if (!isValidEmail) {
          const errorMessage = "Email is invalid";
          throw new Error(errorMessage);
        }
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      trim: true,
      validate(value: string) {
        if (value.toLowerCase().includes("password")) {
          throw new Error("Password cannot contain 'password'");
        }
      },
    },
    role: {
      type: String,
      required: true,
      trim: true,
      enum: ["guest", "admin"],
      default: "guest",
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

userSchema.statics.findByCredentials = async function (
  email: string,
  password: string
) {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Unable to login");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return user;
} as (email: string, password: string) => Promise<IUser>;

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "alabaster");
  user.tokens.push({ token });
  await user.save();
  return token;
};

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User: IUserModel = model<IUser, IUserModel>("User", userSchema);

export default User;
