import Comment from "../models/comment.js";
export const createComment = async (req, res) => {
  try {
    const comment = req.body;
    const newComment = new Comment(comment);
    await newComment.save();
    res.status(200).json(newComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getComments = async (req, res) => {
  try {
    const postId = req.params.id;
    const comments = await Comment.find({ postId });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const id = req.params.id;
    await Comment.findByIdAndDelete(id);
    res.status(200).json("Comment deleted successfully");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
