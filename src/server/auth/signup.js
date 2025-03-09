import { supabase } from "../../lib/supabaseClient.js";
import { prisma } from "../../lib/prisma.js";
import argon2 from "argon2";
import dotenv from "dotenv";

dotenv.config();

export const signup = async (req, res) => {
  const { name, email, password, avatar } = req.body;

  try {
    const userCheck = await prisma.user.findUnique({
      where: { email },
    });

    if (userCheck) {
      return res
        .status(400)
        .json({ success: false, message: "Email already in use" });
    }

    const hashedPassword = await argon2.hash(password);
    let avatarUrl = null;

    if (avatar) {
      try {
        const base64Data = avatar.replace(/^data:image\/\w+;base64,/, "");
        const fileBuffer = Buffer.from(base64Data, "base64");

        const fileName = `${Date.now()}.png`;

        const { data, error } = await supabase.storage
          .from("avatars")
          .upload(fileName, fileBuffer, {
            contentType: "image/png",
          });

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

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        avatar: avatarUrl,
      },
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: { email, name, avatar: avatarUrl },
    });
  } catch (err) {
    console.error("Signup Error:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to register user" });
  }
};
