import { supabase } from "../clients/supabaseClient.js";
import { randomUUID } from "crypto";
import { prisma } from "../clients/prisma.js";
import jwt from 'jsonwebtoken'
export async function newPost(req, res) {
  try {
    const { content, imageUrl, hideComments, hideLikes } = req.body;
    const token= req.cookies.authToken;
    
    if (!imageUrl) {
      return res
        .status(400)
        .json({ success: false, message: "No image provided" });
    }
    const user = jwt.verify(token, process.env.JWT_SECRET);
console.log(user)
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

    const publicUrl = supabase.storage.from("postimages").getPublicUrl(fileName)
      .data.publicUrl;
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
      data,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: `catched error in newPost.js:${err.message}` });
  }
}
