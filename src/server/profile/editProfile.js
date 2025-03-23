import { supabase } from "../clients/supabaseClient.js";
import { prisma } from "../clients/prisma.js";
import { randomUUID } from "crypto";
export const editProfile = async (req, res) => {
  const { userId, email, username, bio, isPrivate, socialLinks, avatar } =
    req.body;
  let avatarUrl = null;
  try {
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (avatar) {
      try {
        const base64Data = avatar.replace(/^data:image\/\w+;base64,/, "");
        const fileBuffer = Buffer.from(base64Data, "base64");
        const fileName = `avatar-${username}-${Date.now()}.png`;

        const { data, error } = await supabase.storage
          .from("avatars")
          .update(fileName, fileBuffer, { contentType: "image/png" });
        if (error) {
          console.error("Supabase Upload Error:", error);
          return res
            .status(500)
            .json({ success: false, message: "Avatar upload failed" });
        }

        avatarUrl = supabase.storage.from("avatars").getPublicUrl(fileName)
          .data.publicUrl;
      } catch (uploadError) {
        console.error("Image Upload Error:", uploadError);
        return res
          .status(500)
          .json({ success: false, message: "Avatar processing failed" });
      }
    }

    const conflictingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email, id: { not: userId } },
          { username, id: { not: userId } },
        ],
      },
    });

    if (conflictingUser) {
      return res.status(400).json({
        success: false,
        message:
          conflictingUser.email === email
            ? "Email already taken"
            : "Username already taken",
      });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        email,
        username,
        bio,
        isPrivate,
        socialLinks: {
          deleteMany: {},
          create: socialLinks,
        },

        avatar,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
