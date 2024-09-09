const mongoose = require("mongoose");

const uri = "";

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
