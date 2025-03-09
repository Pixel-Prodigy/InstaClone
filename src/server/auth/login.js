import { prisma } from "../../lib/prisma.js";
import argon2 from "argon2";
import crypto from "crypto";

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found, please sign up" });
    }

    const isValidPassword = await argon2.verify(user.password, password);
    if (!isValidPassword) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const token = crypto.randomUUID();

    await prisma.user.update({
      where: { email },
      data: { token },
    });

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: { email: user.email, name: user.name, avatar: user.avatar, token },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to Login" });
    console.log(err);
  }
};
