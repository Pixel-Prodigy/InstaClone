import { prisma } from "../clients/prisma.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

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
    console.log(process.env.NEXT_PUBLIC_JWT_SECRET)

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.NEXT_PUBLIC_JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.setHeader(
      "Set-Cookie",
      `authToken=${token}; HttpOnly; Path=/; Max-Age=604800; SameSite=Strict; Secure`
    );

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: {
        email: user.email,
        username: user.username,
        avatar: user.avatar,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Failed to Login" });
  }
};
