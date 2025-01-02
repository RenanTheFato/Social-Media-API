import { FastifyReply, FastifyRequest } from "fastify";
import { FastifyTypedInstance } from "../@types/types";
import { CreateUserController } from "./controllers/users/CreateUserController";
import z from "zod";

interface User {
  id: string,
  name: string,
  email: string
}

const users: User[] = []

export async function routes(fastify: FastifyTypedInstance) {
  fastify.post('/users', {
    schema: {
      tags: ['user', 'creation'],
      description: 'Create a new user',
      body: z.object({
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
      }),
      response: {
        201: z.object({
          message: z.string(),
        }),
        400: z.object({
          message: z.string(),
        }),
      }
    }
  }, async (req: FastifyRequest, rep: FastifyReply) => {
    return new CreateUserController().handle(req, rep)
  })

  fastify.get('/users', {
    schema: {
      tags: ['user'],
      description: 'List users',
      response: {
        200: z.array(z.object({
          id: z.string(),
          name: z.string(),
          email: z.string()
        }))
      }
    }
  }, async (req: FastifyRequest, rep: FastifyReply) => {
    return users
  })
}