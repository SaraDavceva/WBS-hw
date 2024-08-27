const mongoose = require("mongoose");

const uri =
  "mongodb+srv://saradavceva:sara123%40@cluster0.l6sevex.mongodb.net/homework";

const connect = async () => {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected!");
  } catch (err) {
    console.error(err);
  }
};

module.exports = connect;
