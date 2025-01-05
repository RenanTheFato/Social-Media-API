import { FastifyReply, FastifyRequest } from "fastify"
import { UpdateUserEmailService } from "../../services/users/UpdateUserEmailService"
import { prisma } from "../../lib/prisma"
import z from "zod"

interface Props {
  email: string,
}

export class UpdateUserEmailController {
  async handle(req: FastifyRequest, rep: FastifyReply) {

    const userId = req.user.id as string

    const { email } = req.body as Props

    const validateSchema = z.object({
      email: z.string()
        .email({ message: "The value entered isn't an e-mail or the e-mail is invalid." })
    })

    try {
      validateSchema.parse(req.body)
    } catch (error: any) {
      return rep.send(400).send({ message: error.errors })
    }

    try {
      const verifyEmail = await prisma.users.count({
        where: {
          email,
        },
      })

      if (verifyEmail > 0) {
        return rep.status(400).send({ message: "Email is already in use." })
      }

    } catch (error: any) {
      console.error(`Error on verify user email on database: ${error}`)
      throw new Error(`Error on verify user email on on database: ${error}`)
    }

    const updateUserEmailService = new UpdateUserEmailService()

    try {
      await updateUserEmailService.execute({userId, email})
      return rep.code(200).send({ message: 'User email updated successfully' })
    } catch (error) {
      return rep.code(400).send({ message: 'Registration failed' })
    }
  }
}