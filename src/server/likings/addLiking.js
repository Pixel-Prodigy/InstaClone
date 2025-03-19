import { prisma } from "../clients/prisma.js";
import jwt from "jsonwebtoken";
import { randomUUID } from "crypto";
import { supabase } from "../clients/supabaseClient.js";

export const addLiking = async (req, res) => {
  try {
    const { likingTitle, likingDescription, imageUrl } = req.body;
    const token = req.cookies.authToken;

    const user = jwt.verify(token, process.env.JWT_SECRET);

    const base64Data = imageUrl.replace(/^data:image\/\w+;base64,/, "");
    const fileBuffer = Buffer.from(base64Data, "base64");
    const fileName = `post-${Date.now()}-${randomUUID()}.png`;

    const { data, error } = await supabase.storage
      .from("postimages")
      .upload(fileName, fileBuffer, { contentType: "image/png" });

    if (error) {
      return res.status(400).json({
        success: false,
        message: `Error while uploading to storage: ${error.message}`,
      });
    }

    const { publicUrl } = supabase.storage
      .from("postimages")
      .getPublicUrl(fileName).data.publicUrl;

    const newLiking = await prisma.liking.create({
      data: {
        userId: user.id,
        title: likingTitle || "No Title Added",
        content: likingDescription || "No Description Added",
        imageUrl: publicUrl || "/user.jpg",
      },
    });

    res.status(201).json({
      success: true,
      message: "Liking added successfully",
      data: newLiking,
    });
  } catch (err) {
    console.error("Liking Add Error:", err);
    res.status(500).json({
      success: false,
      message: `Caught error in addLiking: ${err.message}`,
    });
  }
};
