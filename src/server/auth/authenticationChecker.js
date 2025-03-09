import { prisma } from "../../lib/prisma.js";
export const authenticateUser = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const user = await prisma.user.findFirst({ where: { token } });

    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    res.status(200).json({
      success: true,
      data: {
        email: user.email,
        name: user.name,
        avatar: user.avatar,
      },
    });
  } catch (err) {
    console.error("Error in /me:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
