//mongodb+srv://admin:admin@cluster0.oy8ptjr.mongodb.net/?appName=Cluster0
import { User } from "../models/User.js";
import { signToken, verifyToken } from "../config/jwt.js";
import bcrypt from "bcrypt";
const getUserById = async (req, res) => {
  const { id } = req.params;
  res.status(200).json({ id: id });
};

const getAllUsers = async (req, res) => {
  const { id } = req.params;
  const users = await Users.find({}).toArray();
  res.status(200).json(users);
};

const createUser = async (req, res) => {
  try {
    const { name, email, age, role, password, dateOfBirth } = req.body;
    //await Users.insertOne({ name, email, age });
    const user = new User({ name, email, age, role, password, dateOfBirth });
    await user.save();
    const token = signToken(user._id);
    res.status(200).json({ message: "User added successfully", token });
  } catch (err) {
    res
      .status(400)
      .json({ message: err.message || "User not added successfully" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = signToken(user._id);
    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    res.status(400).json({ message: err.message || "Login failed" });
  }
};
const logout = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(400).json({ message: "Invalid token" });
    }
    user.logoutTime = new Date();
    await user.save();
    res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    res.status(400).json({ message: err.message || "Logout failed" });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const { id } = req.body;
    await Users.deleteOne({ _id: new ObjectId(id) });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: "User not delete successfully" });
  }
};
const updateUserById = async (req, res) => {
  try {
    const { id } = req.body;
    const { name, email, age } = req.body;
    await Users.updateOne({ _id: new ObjectId(id) }, { $set: { ...req.body } });
    res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    res.status(400).json({ message: "User not updated successfully" });
  }
};
export {
  getUserById,
  createUser,
  getAllUsers,
  deleteUserById,
  updateUserById,
  login,
  logout,
};
// export default getUserById;
