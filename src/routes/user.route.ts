import express, { Request, Response } from "express";
import app from "../app";
import authorize from "../middlewares/authorize";
import User from "../models/user.model";

const router = express.Router();

// Route for user signup
router.post("/signup", async (req: Request, res: Response) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    console.error(error);
    res.status(400).send();
  }
});

// Route for user login
router.post("/login", async (req: Request, res: Response) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});

export default router;
