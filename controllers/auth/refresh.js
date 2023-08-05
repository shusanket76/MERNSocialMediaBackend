const User = require("../../models/user");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const refresh = asyncHandler(async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.status(401).json({ message: "UNAUTHORIZED 10" });
  }
  const refreshToken = cookies.jwt;
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    asyncHandler(async (err, decoded) => {
      if (err) {
        res.json({ message: "FPRBIDDEN" });
      }
      const foundUser = await User.findOne({ username: decoded.username });
      if (!foundUser) {
        res.json({ message: "UNAUTHORIZED 2" });
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
      res.json({ accessToken });
    })
  );
});
module.exports = refresh;
