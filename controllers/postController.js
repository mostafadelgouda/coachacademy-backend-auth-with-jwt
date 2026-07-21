import { Post } from "../models/Post.js";

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
    res.status(200).json(posts);
  } catch (err) {
    res
      .status(400)
      .json({ message: err.message || "Posts not fetched successfully" });
  }
};

const deletePostById = async (req, res) => {
  try {
    const { id } = req.body;
    await Posts.deleteOne({ _id: new ObjectId(id) });
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: "Post not deleted successfully" });
  }
};
const updatePostById = async (req, res) => {
  try {
    const { id } = req.body;
    const { text, imagesUrl } = req.body;
    await Posts.updateOne({ _id: new ObjectId(id) }, { $set: { ...req.body } });
    res.status(200).json({ message: "Post updated successfully" });
  } catch (err) {
    res.status(400).json({ message: "Post not updated successfully" });
  }
};
export { getPostById, createPost, getAllPosts, deletePostById, updatePostById };
// export default getPostById;
