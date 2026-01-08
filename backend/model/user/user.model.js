import mongoose from "mongoose";

const userScheam = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },

    otp: String,
    otpExpiry: Date,
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userScheam);
