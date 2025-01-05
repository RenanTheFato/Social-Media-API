import { prisma } from "../../lib/prisma"

interface Props {
  commentId: string
  userId: string
}

export class DeleteCommentService {
  async execute({ commentId, userId }: Props) {
    const comment = await prisma.comments.findUnique({
      where: {
        id: commentId,
      },
    })

    if (!comment) {
      throw new Error("Comment not found.")
    }

    if (comment.userId !== userId) {
      throw new Error("You are not allowed to delete this comment.")
    }

    await prisma.comments.delete({
      where: {
        id: commentId,
      },
    })
  }
}
