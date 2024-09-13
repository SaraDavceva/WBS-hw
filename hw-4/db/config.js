const mongoose = require("mongoose");

const uri = "";

const connect = async () => {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected!");
  } catch (err) {
    console.error(err);
  }
};

module.exports = connect;
