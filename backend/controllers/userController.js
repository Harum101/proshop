import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";

const authUser = (req, res, next) => {
  const { email, password } = req.body;

  const comparePasswords = async (currentPassword, userPassword) => {
    return await bcrypt.compare(currentPassword, userPassword);
  };

  // email: email can be written only once
  User.findOne({ email }).then((user) => {
    if (user && comparePasswords(password, user.password)) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password ");
    } 
  });
  // .catch((err) => {
  //   throw new Error(err);
  // });
};

const registerUser = (req, res, next) => {
  const { name, email, password } = req.body;

  // email: email can be written only once
  User.findOne({ email })
    .then((user) => {
      if (user) {
        res.status(400);
        throw new Error("User Already Exists");
      } else {
        return User.create({
          name,
          email,
          password,
        });
      }
    })
    .then((user) => {
      if (user) {
        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user._id),
        });
      } else {
        res.status(400);
        throw new Error("Invalid User Data");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const getUserProfile = (req, res, next) => {
  User.findById(req.user._id).then((user) => {
    console.log(req.user._id);
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(404);
      throw new Error("User Not Found");
    }
  });
};

export { authUser, getUserProfile, registerUser };
