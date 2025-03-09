import mongoose from "mongoose";
const commentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  postId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  comments: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Comment", commentSchema);
