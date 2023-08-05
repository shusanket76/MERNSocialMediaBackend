const User = require("../../models/user");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const loginController = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(401).json({ message: "ALL FIELDS ARE REQUIRED" });
  }
  const foundUser = await User.findOne({ username }).exec();
  if (!foundUser) {
    return res
      .status(401)
      .json({ message: "NO USERN FOUND. PLEASE CREATE AN ACCOUNT" });
  }

  const match = await bcrypt.compare(password, foundUser.password);
  console.log(match);
  if (!match) {
    return res.status(401).json({ message: "WRONG PASSWORD" });
  }
  const accessToken = jwt.sign(
    {
      UserInfo: {
        username: foundUser.username,
        roles: foundUser.role,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "2400s" }
  );
  const refreshToken = jwt.sign(
    { username: foundUser.username },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" }
  );
  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  return res.json({ accessToken });
});

module.exports = loginController;
