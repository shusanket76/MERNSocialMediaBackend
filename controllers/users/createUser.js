const User = require("../../models/user");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

const createUser = asyncHandler(async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password) {
    return res.json({ message: "ALL FIELDS ARE REQUIRED" });
  }

  const duplicate = await User.findOne({ username }).lean().exec();

  if (duplicate) {
    return res.json({
      message: `The username ${username} already exists. Please use other user name`,
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const role2 = role ? role : "User";
  const userObject = { username, password: hashedPassword, role: role2 };
  const user = await User.create(userObject);

  if (user) {
    res.json({ message: `${username}! Your account has been created.` });
  } else {
    res.json({ message: "INVALID DATA PROVIDED" });
  }
});

module.exports = createUser;
