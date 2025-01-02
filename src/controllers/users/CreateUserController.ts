import { prisma } from "../../lib/prisma";
import { CreateUserService } from "../../services/users/CreateUserService";
import { FastifyReply, FastifyRequest } from "fastify";
import bcrypt from 'bcryptjs'
import z from 'zod'

interface User {
  email: string,
  password: string,
  username: string,
}

export class CreateUserController {
  async handle(req: FastifyRequest, rep: FastifyReply) {

    const { email, password, username } = req.body as User

    const validateSchema = z.object({
      email: z.string()
        .email({ message: "The value entered isn't an e-mail or the e-mail is invalid." }),
      password: z.string()
        .min(6, { message: "The password doesn't meet the minimum number of characters (8)." })
        .refine((password) => /[A-Z]/.test(password), { message: "Password must contain at least one uppercase letter." })
        .refine((password) => /[0-9]/.test(password), { message: "Password must contain at least one number." })
        .refine((password) => /[@#$*&]/.test(password), { message: "Password must contain at least one of this special characters ('@' '#' '$' '*' '&')." }),
      username: z.string()
        .min(2, { message: "The username doesn't meet the minimum number of characters (2)." })
        .max(128, { message: "The username has exceeded the character limit (128)." })
    })

    try {
      validateSchema.parse(req.body)
    } catch (error: any) {
      return rep.send(400).send({ error: error.errors })
    }

    try {
      const verifyEmail = await prisma.users.count({
        where: {
          email,
        },
      });

      if (verifyEmail > 0) {
        return rep.status(400).send({ message: "Email is already in use." })
      }

    } catch (error: any) {
      console.error(`Error on verify user email on database: ${error}`)
      throw new Error(`Error on verify user email on on database: ${error}`)
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const createUserService = new CreateUserService()

    try {
      await createUserService.execute({ email, password: hashedPassword, username })
      return rep.code(201).send({ message: 'User registered successfully' });
    } catch (error) {
      console.error(error);
      return rep.code(400).send({ message: 'Registration failed' });
    }
  }
}