import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { CreatePostService } from "../../services/posts/CreatePostService";

interface Props {
  content: string,
}

export class CreatePostController {
  async handle(req: FastifyRequest, rep: FastifyReply) {

    const userId = req.user.id as string
    const username = req.user.username as string

    const { content } = req.body as Props

    const validateSchema = z.object({
      content: z.string()
        .min(1, { message: "The content of the post has not reached the minimum number of characters (1)" })
        .max(255, { message: "The content of the post has reached the character limit (255)" })
    })

    try {
      validateSchema.parse(req.body)
    } catch (error: any) {
      return rep.send(400).send({ error: error.errors })
    }

    const createPostService = new CreatePostService()

    try {
      const post = await createPostService.execute({id: userId, content, username})
      return rep.code(201).send({ message: 'Post registered successfully', post: post })
    } catch (error) {
      return rep.code(400).send({ message: 'Registration failed' })
    }
  }
}