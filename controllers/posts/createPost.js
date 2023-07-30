const PostModel = require("../../models/post");
const asyncHandler = require("express-async-handler");

const createPost = asyncHandler(async (req, res) => {
  console.log("he")
  const { title, message, creator, tags } = req.body;

  if (!title || !message || !creator) {
    res.json({ message: "ALL FIELDS ARE REQUIRED" });
  }
  const tags2 = tags ? tags : "";
  const postObject = { title, message, creator, tags: tags2, likeCount: 0 };
  const post = await PostModel.create(postObject);
  if (!post) {
    return res.json({ message: "INVALID INPUT GIVEN" });
  }
  return res.json({ message: "YOUR POST HAS BEEN SUCCESSFULLY CREATED" });
});

module.exports = createPost;
