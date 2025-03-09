import express from "express";
import { signup, login } from "../controllers/user.js";
import { uploadImage, getImage } from "../controllers/image.js";
import { upload } from "../utils/upload.js";
import {
  createComment,
  getComments,
  deleteComment,
} from "../controllers/comment.js";
import {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
} from "../controllers/post.js";
import { authenticateToken } from "../controllers/jwt.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/file/:filename", getImage);
router.get("/posts", authenticateToken, getPosts);
router.get("/post/:id", authenticateToken, getPost);
router.put("/update/:id", authenticateToken, updatePost);
router.delete("/delete/:id", authenticateToken, deletePost);
router.post("/file/upload", upload.single("file"), uploadImage);
router.post("/create", authenticateToken, createPost);
router.post("/comment/new", authenticateToken, createComment);
router.get("/comments/:id", authenticateToken, getComments);
router.delete("/comment/delete/:id", authenticateToken, deleteComment);

export default router;
