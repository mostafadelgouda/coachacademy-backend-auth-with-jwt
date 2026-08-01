import { Post } from "../models/Post.js";
import axios from "axios";
const createPost = async (req, res) => {
  try {
    const { text, imagesUrl } = req.body;
    console.log("req.user", req.user);
    const userId = req.user.id;
    const post = new Post({ text, imagesUrl, userId });
    await post.save();
    res.status(200).json({ message: "Post added successfully" });
  } catch (err) {
    res
      .status(400)
      .json({ message: err.message || "Post not added successfully" });
  }
};
const getPostById = async (req, res) => {
  const { id } = req.params;
  res.status(200).json({ id: id });
};

const getAllPosts = async (req, res) => {
  try {
    console.log(
      "Fetching all posts......................................................",
    );
    const posts = await Post.find({}).populate("userId");
    // const { data } = await axios.get("https://api.weather.com/now", {
    //   //params: { city: "Cairo" },
    //   //headers: { Authorization: `Bearer ${process.env.WEATHER_KEY}` },
    //   timeout: 5000, // never hang forever
    // });
    res.status(200).json({ posts, weather: data });
  } catch (err) {
    res
      .status(400)
      .json({ message: err.message || "Posts not fetched successfully" });
  }
};

const deletePostById = async (req, res) => {
  const { id } = req.body;
  await Posts.deleteOne({ _id: new ObjectId(id) });
  res.status(200).json({ message: "Post deleted successfully" });
  res.status(400).json({ message: "Post not deleted successfully" });
};
const updatePostById = async (req, res) => {
  const { id } = req.body;
  const { text, imagesUrl } = req.body;
  await Posts.updateOne({ _id: new ObjectId(id) }, { $set: { ...req.body } });
  res.status(200).json({ message: "Post updated successfully" });
  res.status(400).json({ message: "Post not updated successfully" });
};
const uploadImage = async (req, res) => {
  res.status(200).json({ message: "Image uploaded successfully" });
};
export {
  getPostById,
  createPost,
  getAllPosts,
  deletePostById,
  updatePostById,
  uploadImage,
};
// export default getPostById;
