const express = require("express");
const router = express.Router();
const getPost = require("../controllers/posts/getPost");
const createPost = require("../controllers/posts/createPost");
router.route("/").get(getPost);

module.exports = router;
