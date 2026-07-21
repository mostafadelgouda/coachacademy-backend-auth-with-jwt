import express from "express";
import {
  getAllPosts,
  getPostById,
  createPost,
  deletePostById,
  updatePostById,
} from "../controllers/postController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.post("/", protect, createPost);
router.delete("/", deletePostById);
router.put("/", updatePostById);

export default router;
