// import user model
import User from "../models/userModel.js";
// import asynchandler
import asyncHandler from "../middlewares/asyncHandler.js";

const createUser = asyncHandler(async (req, res) => {
  res.send("hello");
});


export default createUser;