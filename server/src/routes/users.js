import express from "express";

import jwt from "jsonwebtoken";

import bcrypt from "bcrypt";
import { UserModel } from "../models/Users.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password, name } = req.body.data;
  const user = await UserModel.findOne({ username: username });
  if (user) {
    return res.json({ message: "User Already exists!" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new UserModel({
    username: username,
    password: hashedPassword,
    name: name,
  });
  await newUser.save();
  res.json({ message: "User Registeded Successfully" });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body.data;
  const user = await UserModel.findOne({ username: username });

  if (!user) {
    return res.json({ message: "User doesnot exist" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.json({ message: "Incorrect username or password" });
  }
  const token = jwt.sign({ id: user._id }, "secret");
  res.json({ token, userID: user._id });
});

export { router as UserRouter };

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, "secret", (err) => {
      if (err) {
        return res.sendStatus(403);
      }
      next();
    });
  } else {
    return res.sendStatus(401);
  }
};
