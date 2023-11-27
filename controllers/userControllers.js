const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * @description to register a new user
 * @route post /api/users/register
 * @access public
 */
const registerUser = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;
  if (!userName || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User Already registered");
  }

  console.log("password is", password);

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    userName: userName,
    email: email,
    password: hashedPassword,
  });

  if (user) {
    res.status(200).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("user Data is not valid");
  }

  console.log(`user created ${user}`);

  res.status(200).json({ message: "Register User" });
});

/**
 * @description to login an existing user
 * @route post /api/users/login
 * @access public
 */
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const user = await User.findOne({ email });

  // bcrypt function to compare hashed password in the db with the password getting from req.body to authenticate user
  const comparedPassword = await bcrypt.compare(password, user.password);

  if (user && comparedPassword) {
    res.status(200);

    // sign function accepts few parameters one object which is credentials
    // second is the unique secret key
    // expiration time of access token
    const accessToken = jwt.sign(
      {
        user: {
          userName: user.userName,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15min" }
    );
    res.status(201).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("email or password is not valid");
  }
});

/**
 * @description to get the current user
 * @route get /api/users/current
 * @access private
 */
const currentUser = asyncHandler(async (req, res) => {
  console.log("current user");

  res.status(200).json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };
