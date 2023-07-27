const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    title: String,
    message: String,
    creator: String,
    tags: [String],
    likeCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const PostModel = mongoose.model("PostModel", postSchema);
export default PostModel;
