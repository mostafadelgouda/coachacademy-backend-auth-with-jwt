import express from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  deleteUserById,
  updateUserById,
  login,
  logout,
} from "../controllers/userController.js";
const router = express.Router();
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.post("/login", login);
router.post("/logout", logout);
router.delete("/", deleteUserById);
router.put("/", updateUserById);

export default router;
