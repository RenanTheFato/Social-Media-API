import { FastifyReply, FastifyRequest } from "fastify";
import { DeletePostService } from "../../services/posts/DeletePostService";

export class DeletePostController{
  async handle(req: FastifyRequest, rep: FastifyReply){

    const { postId }  = req.query as { postId: string }
    const userId = req.user.id as string

    try {
      
      const deletePostService = new DeletePostService()

      await deletePostService.execute({postId, userId})

      return rep.status(200).send({ message: 'Post deleted successfully.'})
    } catch (error: any) {
      if (error.message === "Post not found.") {
        return rep.code(404).send({ message: error.message });
      }

      if (error.message === "You are not allowed to delete this post.") {
        return rep.code(403).send({ message: error.message });
      }

      return rep.code(400).send({ message: 'The deletion failed' })
    }
  }
}