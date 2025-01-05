import { FastifyReply, FastifyRequest } from "fastify"
import { DeleteCommentService } from "../../services/comments/DeleteCommentService"

export class DeleteCommentController {
  async handle(req: FastifyRequest, rep: FastifyReply) {
    const { commentId }  = req.query as { commentId: string }
    const userId = req.user.id as string

    try {
      const deleteCommentService = new DeleteCommentService()

      await deleteCommentService.execute({ commentId, userId })

      return rep.status(200).send({ message: "Comment deleted successfully." })
    } catch (error: any) {
      if (error.message === "Comment not found.") {
        return rep.code(404).send({ message: error.message });
      }

      if (error.message === "You are not allowed to delete this comment.") {
        return rep.code(403).send({ message: error.message });
      }

      return rep.code(400).send({ message: 'The deletion failed' })
    }
  }
}
