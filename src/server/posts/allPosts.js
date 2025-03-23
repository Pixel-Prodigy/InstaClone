import { prisma } from "../clients/prisma.js";

export async function allPosts(req, res) {
  try {
    const posts = await prisma.post.findMany({
      include: {
        user: true,
        comments: true,
        likes: true,
      },
    });

    const filteredPosts = posts
      .filter((post) => !post.user.isPrivate)
      .map((post) => ({
        ...post,
        imageUrl: post.imageUrl,
        user: post.user,
        content: post.content,
        hideComments: post.hideComments,
        createdAt: post.createdAt,
        hideLikes: post.hideLikes,
      }));

    return res.status(200).json({
      success: true,
      data: filteredPosts,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: `Caught error in allPosts: ${err}` });
  }
}
