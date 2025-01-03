import { FastifyReply, FastifyRequest } from "fastify";
import { FastifyTypedInstance } from "../@types/types";

import { CreateUserController } from "./controllers/users/CreateUserController";
import { CreatePostController } from "./controllers/posts/CreatePostController";
import { CreateCommentController } from "./controllers/comments/CreateCommentController";

import { SinginUserController } from "./controllers/users/SinginUserController";
import { SearchPostController } from "./controllers/posts/SearchPostController";
import { GetUserController } from "./controllers/users/GetUserController";

import { DeleteUserController } from "./controllers/users/DeleteUserController";
import { DeletePostController } from "./controllers/posts/DeletePostController";
import { DeleteCommentController } from "./controllers/comments/DeleteCommentController";

import { UpdateUserEmailController } from "./controllers/users/UpdateUserEmailController";

import { AuthMiddleware } from "./middlewares/authentication";
import z from "zod";
import { UpdateUsernameController } from "./controllers/users/UpdateUsernameController";
import { UpdateUserPasswordController } from "./controllers/users/UpdateUserPasswordController";


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
        content: z.string()
          .min(1, { message: "The content of the post has not reached the minimum number of characters (1)" })
          .max(255, { message: "The content of the post has reached the character limit (255)" })
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
        postId: z.string().min(1, { message: "Couldn't find the post" }),
        content: z.string()
          .min(1, { message: "The content of the post has not reached the minimum number of characters (1)" })
          .max(255, { message: "The content of the post has reached the character limit (255)" })
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
    preHandler: AuthMiddleware,
    schema: {
      tags: ['delete', 'user'],
      response: {
        200: z.object({
          message: z.string(),
        }),
        400: z.object({
          message: z.string(),
        }),
      }
    }
  }, async (req: FastifyRequest, rep: FastifyReply) => {
    return new DeleteUserController().handle(req, rep)
  })

  fastify.delete("/delete-post", {
    preHandler: AuthMiddleware,
    schema: {
      tags: ['delete', 'posts'],
      response: {
        200: z.object({
          message: z.string(),
        }),
        400: z.object({
          message: z.string(),
        }),
        403: z.object({
          message: z.string(),
        }),
        404: z.object({
          message: z.string(),
        }),
      }
    }
  }, async(req: FastifyRequest, rep: FastifyReply) => {
    return new DeletePostController().handle(req, rep)
  })

  fastify.delete("/delete-comment", {
    preHandler: AuthMiddleware,
    schema: {
      tags: ['delete', 'comments'],
      response: {
        200: z.object({
          message: z.string(),
        }),
        400: z.object({
          message: z.string(),
        }),
        403: z.object({
          message: z.string(),
        }),
        404: z.object({
          message: z.string(),
        }),
      }
    }
  }, async (req: FastifyRequest, rep: FastifyReply) => {
    return new DeleteCommentController().handle(req, rep)
  })

  fastify.patch("/update-user-email", {
    preHandler: AuthMiddleware,
    schema: {
      tags: ['update', 'user'],
      response: {
        200: z.object({
          message: z.string(),
        }),
        400: z.object({
          message: z.string(),
        }),
      }
    }
  }, async(req: FastifyRequest, rep: FastifyReply) =>{
    return new UpdateUserEmailController().handle(req, rep)
  })

  fastify.patch("/update-username", {
    preHandler: AuthMiddleware,
    schema: {
      tags: ['update', 'user'],
      response: {
        200: z.object({
          message: z.string(),
        }),
        400: z.object({
          message: z.string(),
        }),
      }
    }
  }, async(req: FastifyRequest, rep: FastifyReply) =>{
    return new UpdateUsernameController().handle(req, rep)
  })

  fastify.patch("/update-user-password", {
    preHandler: AuthMiddleware,
    schema: {
      tags: ['update', 'user'],
      response: {
        200: z.object({
          message: z.string(),
        }),
        400: z.object({
          message: z.string(),
        }),
        409: z.object({
          message: z.string(),
        }),
      }
    }
  }, async(req: FastifyRequest, rep: FastifyReply) =>{
    return new UpdateUserPasswordController().handle(req, rep)
  })

}