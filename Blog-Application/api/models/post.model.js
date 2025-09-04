import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: 3,
      maxlength: 150,
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      minlength: 10,
    },
    author: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["Technology", "Design", "Business", "Lifestyle", "Travel", "Food","Other"], // optional, can customize
      default: "Other",
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    excerpt: {
      type: String, 
      required:true,
    }
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
