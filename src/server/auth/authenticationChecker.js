import { prisma } from "../clients/prisma.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const authenticateUser = async (req, res) => {
  try {
    const token = req.cookies.authToken;
    console.log(req.cookies);
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    res.status(200).json({
      success: true,
      data: {
        email: user.email,
        username: user.username,
        avatar: user.avatar,
      },
    });
  } catch (err) {
    console.error("Authentication Error:", err);
    res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
};
