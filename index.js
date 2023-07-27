const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const post = require("./routes/posts");

require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use("/post", post);

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
