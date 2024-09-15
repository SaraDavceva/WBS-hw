const mongoose = require("mongoose");

const uri =
  "mongodb+srv://saradavceva:sara123@cluster0.l6sevex.mongodb.net/grupa1?retryWrites=true&w=majority";

async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected!");
  } catch (err) {
    console.error(err);
  }
}

// connect();
module.exports = connect;
