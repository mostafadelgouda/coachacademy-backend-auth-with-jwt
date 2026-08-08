import express from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  deleteUserById,
  updateUserById,
  login,
  logout,
  sendEmail,
} from "../controllers/userController.js";
// import { validateUser } from "../validators/userValidators.js";
import { validate } from "../middleware/validate.js";
import {
  createUser as createUserSchema,
  updateUser as updateUserSchema,
} from "../validators/userValidators.js";
import { errorHandlingMiddleware } from "../middleware/errorHandling.js";
import asyncHandler from "express-async-handler";

const router = express.Router();
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", validate(createUserSchema), asyncHandler(createUser));
router.post("/login", login);
router.post("/logout", logout);
router.delete("/", deleteUserById);
router.put("/", validate(updateUserSchema), updateUserById);

router.post("/send-email", sendEmail);

export default router;
