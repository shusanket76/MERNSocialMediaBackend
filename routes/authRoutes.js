const express = require("express");
const router = express.Router();
const loginController = require("../controllers/auth/login");
const logout = require("../controllers/auth/logout");
const refresh = require("../controllers/auth/refresh");
const loginLimiter = require("../middleware/loginLimiter");

router.route("/").post(loginLimiter, loginController);
router.route("/refresh").get(refresh);
router.route("/logout").post(logout);

module.exports = router;
