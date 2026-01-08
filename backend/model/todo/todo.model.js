import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
    },

    category: {
      type: String,
      required: true,
    },

    priority: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      required: true,
    },

    // status: {
    //   type: String,
    //   enum: ["pending", "completed", "inprogress"],
    //   default: "pending",
    // },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const Todo = mongoose.model("Todo", todoSchema);
