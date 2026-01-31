// import user model
import User from "../models/userModel.js";
// import asynchandler
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcryptjs";

// import createtoken
import createToken from "../utils/createToken.js";

// craete a new user

const createUser = asyncHandler(async (req, res) => {
  //   res.send("hello");
  // create a user credendials
  const { username, email, password } = req.body;
  //   just view that request body is working or not
  //   console.log(username, email, password);

  //   NOW if user don't add any of fields then got the error
  if (!username || !email || !password) {
    throw new Error("Please add all fields");
  }
  //   now we check the user is exist or not using the email
  // use the findone method for checking the email
  const userExists = await User.findOne({ email });
  if (userExists) res.status(400).send("User already exists");
  // bcrypt the user password using salt
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  //   create new user
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    createToken(res, newUser._id);
    res.status(201).send("User created successfully");
  } catch (error) {
    res.status("Invalid User data");
  }
});

// login to user
const loginUser = asyncHandler(async (req, res) => {
  // login logic here
  //   we need login to the user for email and password
  const { email, password } = req.body;

  //   check if user is exist or not
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password,
    );
    if (isPasswordValid) {
        createToken(res, existingUser._id);
      res.status(200).send("Login successful");
    }
    return;
  }
});

// logout current user
const logoutCurrentUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).send("Logout successful");
});

export { createUser, loginUser, logoutCurrentUser };
