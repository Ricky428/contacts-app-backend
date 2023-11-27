const mongoose = require("mongoose");

const userScheme = mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "User name is a required field"],
    },
    email: {
      type: String,
      required: [true, "Email is a required field"],
      unique: [true, "Email already taken !"],
    },
    password: {
      type: String,
      required: [true, "Password is a required field"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userScheme);
