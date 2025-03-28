import { prisma } from "../clients/prisma.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { GiConsoleController } from "react-icons/gi";
dotenv.config();

export const authenticateUser = async (req, res) => {
  try {
    const token = req.cookies.authToken;

    if (!token) {
      return res.status(201).json({ success: false, message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      include: {
        followers: true,
        following: true,
        posts: true,
        likes: true,
        comments: true,
        socialLinks: true,
      },
    });

    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    res.status(200).json({
      success: true,
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
    console.error("Authentication Error:", err);
    res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
};
