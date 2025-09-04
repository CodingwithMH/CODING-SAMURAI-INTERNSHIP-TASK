import Post from '../models/post.model.js';
import { errorHandler } from '../utils/error.js';

export const createPost = async (req, res, next) => {
  try {
    const { title, content, author, category, isFeatured, excerpt } = req.body;

    if (!title || !content || !author) {
      return res.status(400).json({ error: "Title, content, and author are required" });
    }

    const newPost = new Post({
      title,
      content,
      author,
      category,
      isFeatured,
      excerpt
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
};

// UPDATE POST
export const updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;

    const updatedPost = await Post.findByIdAndUpdate(id, req.body, {
      new: true, // return updated doc
      runValidators: true, // validate before updating
    });

    if (!updatedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};

export const getposts = async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }); // latest first
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch posts", error: err.message });
  }
};

export const deletepost = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to delete this post'));
  }
  try {
    await Post.findByIdAndDelete(req.params.postId);
    res.status(200).json('The post has been deleted');
  } catch (error) {
    next(error);
  }
};

