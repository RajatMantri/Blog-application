import { Post } from "../models/post.js";

export const createPost = async (req, res) => {
  try {
    const post = await new Post(req.body);
    post.save();
    return res.status(200).json("Post saved successfully");
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const getPosts = async (req, res) => {
  let category = req.query.category;
  try {
    if (category) {
      const posts = await Post.find({ categories: category });
      return res.status(200).json(posts);
    } else {
      const posts = await Post.find();
      return res.status(200).json(posts);
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const getPost = async (req, res) => {
  let id = req.params.id;
  try {
    const post = await Post.findById(id);
    return res.status(200).json(post);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const updatePost = async (req, res) => {
  let id = req.params.id;
  try {
    const post = await Post.findById(id);
    if (!post) return res.status(404).json("Post not found");
    await Post.findByIdAndUpdate(id, { $set: req.body }); //addToSet
    return res.status(200).json("Post updated successfully");
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const deletePost = async (req, res) => {
  let id = req.params.id;
  try {
    const post = await Post.findById(id);
    if (!post) return res.status(404).json("Post not found");
    await post.deleteOne();
    return res.status(200).json("Post deleted successfully");
  } catch (err) {
    return res.status(500).json(err);
  }
};
