import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../model/user";

const userRouter = Router();

userRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ message: "Please add all fields" });
    return;
  }

  const exists = await User.exists({ email });

  if (exists) {
    res.status(400).json({ message: "User already exists" });
    return;
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const user = new User({ name, email, password: hashPassword });

  try {
    const savedUser = await user.save();
    res.status(201).json({ user: savedUser });
    return;
  } catch (err) {
    res.status(500).json({ message: (err as any).message });
    return;
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Please add all fields" });
    return;
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    res.json(400).json({ message: "Invalid credentials" });
    return;
  }

  const token = jwt.sign({ user: user._id }, process.env.TOKEN_SECRET!, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign(
    { user: user._id },
    process.env.REFRESH_TOKEN_SECRET!,
  );

  try {
    user.refreshToken = refreshToken;
    await user.save();

    res.json({ user, token, refreshToken });
    return;
  } catch (err) {
    res.status(400).json({ error: (err as any).message });
  }
});

userRouter.post("/refresh", async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const userId = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!);

  const token = jwt.sign({ user: userId }, process.env.TOKEN_SECRET!, {
    expiresIn: "15m",
  });

  res.json({ token });
  return;
});

userRouter.post("/logout", async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    await User.findOneAndUpdate({ refreshToken }, { refreshToken: "" });

    res.json({ message: "Logout Successful" });
    return;
  } catch (err) {
    res.status(400).json({ error: (err as any).message });
  }
});

export default userRouter;
