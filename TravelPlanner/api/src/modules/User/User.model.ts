import { Document } from "mongodb";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { User } from "./User.types";
import jwt from "jsonwebtoken";

// schema for user
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
// pre save hook to hash password
userSchema.pre("save", function (next) {
  const user: Document = this;

  if (!user.isModified("password")) {
    return next();
  }

  try {
    bcrypt.hash(user.password, 10, function (err: Error | null, hash: string) {
      if (err) {
        throw err;
      }
      user.password = hash;
      return next();
    });
  } catch (err: any) {
    return next(err);
  }
});
// methods for user
userSchema.methods = {
  comparePassword: function (password: string) {
    const user = this;
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err: Error | null, isMatch: boolean) => {
        if (isMatch) {
          resolve(true);
        } else {
          reject(err);
        }
      });
    });
  },
  generateToken: function () {
    const user = this;
    return jwt.sign({ _id: user._id }, process.env.JWT_SECRET ?? "", {
      expiresIn: 60 * 120,
    });
  },
};
// remove password from user object
userSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.password;
  },
});

userSchema.set("toObject", {
  transform: function (doc, ret) {
    delete ret.password;
  },
});
// create user model
const UserModel = mongoose.model<User>("User", userSchema);

export default UserModel;