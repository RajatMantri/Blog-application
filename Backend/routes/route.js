import express from "express";
import { signup, login } from "../controllers/user.js";
import { uploadImage, getImage } from "../controllers/image.js";
import { upload } from "../utils/upload.js";
import { createPost } from "../controllers/post.js";
import { authenticateToken } from "../controllers/jwt.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/file/:filename", getImage);
router.post("/file/upload", upload.single("file"), uploadImage);
router.post("/create", authenticateToken, createPost);

export default router;
