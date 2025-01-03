import { prisma } from "../../lib/prisma";

interface Props{
  postId: string,
  userId: string,
}

export class DeletePostService{
  async execute({ postId, userId }: Props){

    const post = await prisma.posts.findUnique({
      where: {
        id: postId,
      },
    })

    if (!post) {
      throw new Error("Post not found.")
    }

    if (post.userId !== userId) {
      throw new Error("You are not allowed to delete this post.")
    }

    await prisma.posts.delete({
      where: {
        id: postId,
      },
    })
  }
}