const PostModel = require("../../models/post");
const asyncHandler = require("express-async-handler");

const getPosts = asyncHandler(async (req, res) => {
  const posts = await PostModel.find().lean();
  if (!posts.length) {
    return res.json({ message: "NO POSTS FOUND" });
  }
  return res.json({ message: posts });
});

module.exports = getPosts;
