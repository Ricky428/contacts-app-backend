const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.URI);
  } catch (error) {
    console.log("error is", error);
    process.exit(1);
  }
};

module.exports = connectDb;
