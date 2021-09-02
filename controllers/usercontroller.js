import asynchandler from "express-async-handler";
import User from "../models/usermodel.js";
import generateauth from "../generateauth.js";

export const createuser = asynchandler(async (req, res) => {
  const { email, password, name } = req.body;

  const user = await User.create({
    email,
    password,
    name,
  });

  if (user) {
    res.json({
      id: user._id,
      email: user.email,
      name: user.name,
      // isAdmin: user.isAdmin,
    });
  } else {
    res.send("invalid credentials");
  }
});

export const loginuser = asynchandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchpassword(password))) {
    res.json({
      id: user._id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
      token: generateauth(user._id),
    });
  } else {
    res.send("invalid credentials");
  }
});

export const getuserprofile = asynchandler(async (req, res) => {
  // const {email,password}=req.body

  const user = await User.findbyId(req.user._id);

  if (user) {
    res.json({
      id: user._id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
      token: generateauth(user._id),
    });
  } else {
    res.send("user not found");
  }
});

export const updateuserprofile = asynchandler(async (req, res) => {
  const user = await User.findbyId(req.user._id);
  if (user) {
    if (req.body.email) {
      user.email = req.body.email;
    }
    if (req.body.name) {
      user.name = req.body.name;
    }
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updateduser = await user.save();
    res.json({
      id: updateduser._id,
      name: updateduser.name,
      email: updateduser.email,

      isAdmin: updateduser.isAdmin,
      token: generateauth(user._id),
    });
  } else {
    res.status(404).send();
    throw new Error("User not found");
  }
});

export const deleteuser = asynchandler(async (req, res) => {
  const user = await User.findbyId(req.user._id);
  if (user) {
    await user.remove();
    res.json("user removed");
  } else {
    throw new Error("user not found");
  }
});

export const updateuserbyid = asynchandler(async (req, res) => {
  const user = await User.findbyId(req.params.id);
  if (user) {
    if (req.body.email) {
      user.email = req.body.email;
    }
    if (req.body.name) {
      user.name = req.body.name;
    }
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updateduser = await user.save();
    res.json({
      id: updateduser._id,
      name: updateduser.name,
      email: updateduser.email,

      isAdmin: updateduser.isAdmin,
      token: generateauth(user._id),
    });
  } else {
    res.status(404).send();
    throw new Error("User not found");
  }
});

export const getuserbyid = asynchandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    throw new Error("User not found");
  }
});

export const getusers = asynchandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});
