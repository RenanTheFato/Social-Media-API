import { FastifyReply, FastifyRequest } from "fastify"
import { prisma } from "../../lib/prisma"
import bcrypt from 'bcryptjs'
import z from "zod";
import { UpdateUserPasswordService } from "../../services/users/UpdateUserPasswordService";

interface Props {
  current_password: string,
  new_password: string,
}

export class UpdateUserPasswordController {
  async handle(req: FastifyRequest, rep: FastifyReply) {

    const userId = req.user.id as string

    const { current_password, new_password } = req.body as Props

    const validateSchema = z.object({
      new_password: z.string()
        .min(6, { message: "The password doesn't meet the minimum number of characters (8)." })
        .refine((password) => /[A-Z]/.test(password), { message: "Password must contain at least one uppercase letter." })
        .refine((password) => /[0-9]/.test(password), { message: "Password must contain at least one number." })
        .refine((password) => /[@#$*&]/.test(password), { message: "Password must contain at least one of this special characters ('@' '#' '$' '*' '&')." }),
    })

    try {
      validateSchema.parse(req.body)
    } catch (error: any) {
      return rep.status(400).send({ message: error.errors })
    }

    try {
      const verifyPassword = await prisma.users.findUnique({
        select: {
          password: true,
        },
        where: {
          id: userId
        }
      })

      const isPasswordCorrect = await bcrypt.compare(current_password, String(verifyPassword?.password))

      if (!isPasswordCorrect) {
        return rep.status(409).send({ message: "Current password is incorrect"})
      }

      const newHashedPassword = await bcrypt.hash(new_password, 10)

      const updateUserPasswordService = new UpdateUserPasswordService()

      await updateUserPasswordService.execute({userId ,password: newHashedPassword})
      return rep.code(200).send({ message: 'User password updated successfully' });
    } catch (error) {
      return rep.code(400).send({ message: 'Registration failed' });
    }
  }
}