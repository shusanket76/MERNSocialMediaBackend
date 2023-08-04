const express = require("express");
const router = express.Router();
const getPosts = require("../controllers/posts/getPost");
const createPost = require("../controllers/posts/createPost");
const verifyJwt = require("../middleware/verifyJwt");
router.use(verifyJwt);
router.route("/").get(getPosts).post(createPost);

module.exports = router;
