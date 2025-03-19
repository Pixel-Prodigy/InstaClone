import { supabase } from "../clients/supabaseClient.js";
import { prisma } from "../clients/prisma.js";
import argon2 from "argon2";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const signup = async (req, res) => {
  const { username, email, password, avatar } = req.body;

  try {
    const userCheck = await prisma.user.findUnique({ where: { email } });
    if (userCheck) {
      return res
        .status(400)
        .json({ success: false, message: "This email is already in use." });
    }

    const userNameCheck = await prisma.user.findUnique({ where: { username } });
    if (userNameCheck) {
      return res.status(400).json({
        success: false,
        message: "This username isn't available. Please try another.",
      });
    }

    const hashedPassword = await argon2.hash(password);
    let avatarUrl = null;

    if (avatar) {
      try {
        const base64Data = avatar.replace(/^data:image\/\w+;base64,/, "");
        const fileBuffer = Buffer.from(base64Data, "base64");
        const fileName = `avatar-${username}-${Date.now()}.png`;

        const { data, error } = await supabase.storage
          .from("avatars")
          .upload(fileName, fileBuffer, { contentType: "image/png" });
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

    const newUser = await prisma.user.create({
      data: { username, email, password: hashedPassword, avatar: avatarUrl },
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (err) {
    console.error("Signup Error:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to register user" });
  }
};
