import { FastifyReply, FastifyRequest } from "fastify"
import { CreateCommentService } from "../../services/comments/CreateCommentService"
import z from "zod"

interface Props {
  postId: string,
  content: string,
}

export class CreateCommentController {
  async handle(req: FastifyRequest, rep: FastifyReply) {

    const userId = req.user.id as string
    const username = req.user.username as string

    const { postId, content } = req.body as Props


    const validateSchema = z.object({
      postId: z.string().min(1, { message: "Couldn't find the post"}),
      content: z.string()
        .min(1, { message: "The content of the post has not reached the minimum number of characters (1)" })
        .max(255, { message: "The content of the post has reached the character limit (255)" })
    })

    try {
      validateSchema.parse(req.body)
    } catch (error: any) {
      return rep.send(400).send({ error: error.errors })
    }

    const createCommentService = new CreateCommentService()

    try {
      const comment = await createCommentService.execute({userId, postId, content, username})
      return rep.code(201).send({ message: 'comment registered successfully', comment: comment });
    } catch (error: any) {
      if (error.message === "Post not found.") {
        return rep.code(404).send({ message: error.message });
      }

      return rep.code(400).send({ message: `Registration failed ${error}` })
    }
  }
}