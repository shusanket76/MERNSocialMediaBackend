const express = require("express");
const router = express.Router();
const getUsers = require("../controllers/users/getUser");
const createUser = require("../controllers/users/createUser");

router.route("/").get(getUsers).post(createUser);

module.exports = router;
