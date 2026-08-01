import express from "express";
import {
  getAllPosts,
  getPostById,
  createPost,
  deletePostById,
  updatePostById,
  uploadImage,
} from "../controllers/postController.js";
import { protect } from "../middleware/authMiddleware.js";
import multer from "multer";

const router = express.Router();
const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB
});

router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.post("/", protect, createPost);
router.delete("/", protect, deletePostById);
router.put("/", protect, updatePostById);
router.post("/upload", upload.single("image"), uploadImage);
export default router;
