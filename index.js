const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const posts = require("./routes/posts");
const users = require("./routes/user");

require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use("/posts", posts);
app.use("/users", users);

const start = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    app.listen(4000, () => {
      console.log("SERVER RUNNING SUCCESSFULLY ON PORT 4000");
    });
  } catch (error) {
    console.log(error);
  }
};

start();
