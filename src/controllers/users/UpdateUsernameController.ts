import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { prisma } from "../../lib/prisma";
import { UpdateUsernameService } from "../../services/users/UpdateUsernameService";

interface Props {
  username: string,
}

export class UpdateUsernameController {
  async handle(req: FastifyRequest, rep: FastifyReply) {

    const userId = req.user.id as string

    const { username } = req.body as Props

    const validateSchema = z.object({
      username: z.string()
        .min(2, { message: "The username doesn't meet the minimum number of characters (2)." })
        .max(128, { message: "The username has exceeded the character limit (128)." })
    })

    try {
      validateSchema.parse(req.body)
    } catch (error: any) {
      return rep.send(400).send({ message: error.errors })
    }

    try {
      const verifyUsername = await prisma.users.count({
        where: {
          username,
        },
      })

      if (verifyUsername > 0) {
        return rep.status(400).send({ message: "Username is already in use." })
      }

    } catch (error: any) {
      console.error(`Error on verify username on database: ${error}`)
      throw new Error(`Error on verify username on on database: ${error}`)
    }

    const updateUsernameService = new UpdateUsernameService()

    try {
      await updateUsernameService.execute({userId, username})
      return rep.code(200).send({ message: 'Username updated successfully' });
    } catch (error) {
      return rep.code(400).send({ message: 'Registration failed' });
    }
  }
}