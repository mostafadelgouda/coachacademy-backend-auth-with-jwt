import { verifyToken } from "../config/jwt.js";
import { User } from "../models/User.js";
export const protect = async (req, res, next) => {
  const header = req.headers.authorization || "";

  const token = header.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "No token" });
  try {
    req.user = verifyToken(token);
    const user = await User.findById(decoded.id);
    if (user.logoutTime && user.logoutTime < new Date()) {
      return res
        .status(401)
        .json({ msg: "Token has been invalidated due to logout" });
    }
    next();
  } catch {
    res.status(401).json({ msg: "Invalid token" });
  }
};
