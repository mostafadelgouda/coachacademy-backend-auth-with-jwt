import mongoose from "mongoose";
// import dotenv from "dotenv";
// dotenv.config();

async function connectToDatabase() {
  console.log("Connecting to MongoDB...");
  console.log("MONGO_URI:", process.env.MONGO_URI);
  await mongoose.connect(process.env.MONGO_URI);
}

export default connectToDatabase;
