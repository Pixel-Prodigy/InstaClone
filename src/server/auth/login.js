import { prisma } from "../clients/prisma.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        followers: true,
        following: true,
        posts: true,
        likes: true,
        comments: true,
      },
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

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: false,
      maxAge: 3600000,
    });

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: {
        id: user.id,
        email: user.email,
        username: user.username,
        avatar: user.avatar || "/user.jpg",
        followers: user.followers,
        following: user.following,
        posts: user.posts,
        likes: user.likes,
        comments: user.comments,
        socialLinks: user.socialLinks || [],
        isPrivate: user.isPrivate,
        bio: user.bio,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to Login" });
  }
};
