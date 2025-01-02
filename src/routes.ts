import { FastifyReply, FastifyRequest } from "fastify";
import { FastifyTypedInstance } from "../@types/types";
import { CreateUserController } from "./controllers/users/CreateUserController";
import { SinginUserController } from "./controllers/users/SinginUserController";
import { GetUserController } from "./controllers/users/GetUserController";
import { AuthMiddleware } from "./middlewares/authentication";
import { CreatePostController } from "./controllers/posts/CreatePostController";
import { SearchPostController } from "./controllers/posts/SearchPostController";
import { CreateCommentController } from "./controllers/comments/CreateCommentController";
import z from "zod";
import { DeleteUserController } from "./controllers/users/DeleteUserController";
import { DeleteCommentController } from "./controllers/comments/DeleteCommentController";


export async function routes(fastify: FastifyTypedInstance) {
  fastify.post('/singup', {
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

  fastify.post('/singin', {
    schema: {
      tags: ['user', 'authenticate'],
      description: 'Authenticate an exist user with your credentials',
      body: z.object({
        email: z.string(),
        password: z.string()
      }),
      response: {
        201: z.object({
          user: z.object({
            token: z.string()
          })
        }),
        401: z.object({
          message: z.string()
        })
      }
    }
  }, async (req: FastifyRequest, rep: FastifyReply) => {
    return new SinginUserController().handle(req, rep)
  })

  fastify.post('/create-post', {
    preHandler: AuthMiddleware,
    schema: {
      tags: ['posts', 'creation'],
      description: 'Create a post',
      body: z.object({
        content: z.string(),
      }),
      response: {
        201: z.object({
          message: z.string(),
          post: z.object({
            id: z.string(),
            content: z.string(),
            author: z.string(),
            userId: z.string(),
            created_at: z.date()
          })
        })
      }
    }
  }, async (req: FastifyRequest, rep: FastifyReply) => {
    return new CreatePostController().handle(req, rep)
  })

  fastify.post('/create-comment', {
    preHandler: AuthMiddleware,
    schema: {
      tags: ['comments', 'creation'],
      description: 'Create a comment on a post',
      body: z.object({
        postId: z.string(),
        content: z.string(),
      }),
      response: {
        201: z.object({
          message: z.string(),
          comment: z.object({
            id: z.string(),
            content: z.string(),
            author: z.string(),
            created_at: z.date(),
            userId: z.string(),
            postId: z.string(),
          })
        }),
        401: z.object({
          message: z.string(),
        }),
        404: z.object({
          message: z.string(),
        })
      }
    }
  }, async (req: FastifyRequest, rep: FastifyReply) => {
    return new CreateCommentController().handle(req, rep)
  })

  fastify.get('/user', {
    preHandler: AuthMiddleware,
    schema: {
      tags: ['user'],
      description: 'Get user informations',
      response: {
        201: z.object({
          user: z.object({
            id: z.string(),
            email: z.string(),
            password: z.string(),
            username: z.string(),
            created_at: z.date(),
            updated_at: z.date(),
          })
        }),
        400: z.object({
          message: z.string(),
        }),
        401: z.object({
          message: z.string(),
        })
      }
    }
  }, async (req: FastifyRequest, rep: FastifyReply) => {
    return new GetUserController().handle(req, rep)
  })


  fastify.get('/search-post', {
    preHandler: AuthMiddleware,
    schema: {
      tags: ['posts', 'search'],
      description: 'Search for a post',
      response: {
        201: z.object({
          id: z.string(),
          content: z.string(),
          author: z.string(),
          created_at: z.date(),
          userId: z.string()
        }),
        401: z.object({
          message: z.string(),
        })
      }
    }
  }, async (req: FastifyRequest, rep: FastifyReply) => {
    return new SearchPostController().handle(req, rep)
  })

  fastify.delete("/delete-user", {
    preHandler: AuthMiddleware
  }, async(req: FastifyRequest, rep: FastifyReply) =>{
    return new DeleteUserController().handle(req, rep)
  })

  fastify.delete("/delete-comment", {
    preHandler: AuthMiddleware
  }, async(req: FastifyRequest, rep: FastifyReply) =>{
    return new DeleteCommentController().handle(req, rep)
  })
}