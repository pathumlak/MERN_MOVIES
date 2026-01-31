// import user model
import User from "../models/userModel.js";
// import asynchandler
import asyncHandler from "../middlewares/asyncHandler.js";

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

//   create new user
const newUser = new User({username, email, password});
try {
    await newUser.save()
    res.status(201).send("User created successfully")
} catch (error) {
    res.status("Invalid User data")
    
}
});

export default createUser;
