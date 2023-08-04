const User = require("../../models/user");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const logout = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.json({ message: "NO CONTENT" });
  }
  res.clearCookie("jwt", { httpOnly: true, secure: true, sameSite: "None" });
  res.json({ messgae: "COOKIE CLEARED" });
};
module.exports = logout;
