import { supabase } from "../supabaseClient.js";
import { randomUUID } from "crypto";
import { prisma } from "../clients/prisma.js";
export async function newPost(req, res) {
  try {
    const { content, imageUrl, hideComments, hideLikes, user } = req.body;
    console.log(user);
    if (!imageUrl) {
      return res
        .status(400)
        .json({ success: false, message: "No image provided" });
    }

    const base64Data = imageUrl.replace(/^data:image\/\w+;base64,/, "");
    const fileBuffer = Buffer.from(base64Data, "base64");
    const fileName = `post-${Date.now()}-${randomUUID()}.png`;

    const { data, error } = await supabase.storage
      .from("postimages")
      .upload(fileName, fileBuffer, { contentType: "image/png" });

    if (error) {
      return res.status(400).json({ success: false, message: error.message });
    }

    const publicUrl = supabase.storage
      .from("postimages")
      .getPublicUrl(fileName);

    await prisma.post.create({
      data: {
        userId: user.id,
        content,
        hideComments: hideComments ?? false,
        hideLikes: hideLikes ?? false,
        imageUrl: publicUrl,
      },
    });
    return res.status(200).json({
      success: true,
      message: "Post created successfully",
      imageUrl: publicUrl,
      data,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}
