import mongoose from "mongoose";
import bcrypt from "bcrypt";
const postSchema = new mongoose.Schema(
  {
    text: { type: String, required: true, message: "Text is required" },
    imagesUrl: { type: [String], default: [] },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

const Post = mongoose.model("Post", postSchema);
export { Post };
