const User = require("../../models/user");
const asyncHandler = require("express-async-handler");

const getUsers = asyncHandler(async (req, res) => {
  
  const user = await User.find().select("-password").lean();
  if (!user.length) {
    return res.json("NO DATA FOUND");
  }
  return res.json({ message: user });
});

module.exports = getUsers;
