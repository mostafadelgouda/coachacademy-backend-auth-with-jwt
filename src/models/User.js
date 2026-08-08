import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, message: "Name is required" },
    email: { type: String, unique: true, message: "Email is already in use" },
    age: { type: Number, min: 0, message: "Age must be a positive number" },
    role: {
      type: String,
      default: "user",
      enum: {
        values: ["user", "admin", "moderator"],
        message: "{VALUE} is not supported",
      },
    },
    password: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    logoutTime: { type: Date, default: null },
  },
  { timestamps: true },
);
userSchema.index({ name: 1 }, { unique: true });
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});
const User = mongoose.model("User", userSchema);
export { User };
