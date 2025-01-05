import { FastifyReply, FastifyRequest } from "fastify"
import { prisma } from "../lib/prisma"
import jwt from 'jsonwebtoken'

type JwtPayLoad = {
  id: string,
}

export async function AuthMiddleware(req: FastifyRequest, rep: FastifyReply) {

  const { authorization } = req.headers

  if (!authorization) {
    return rep.status(401).send({ message: 'Unauthorized' })
  }

  const token = authorization.split(" ")[1]

  try {
    const { id } = jwt.verify(token, process.env.JWT_PASSWORD ?? '') as JwtPayLoad

    const user = await prisma.users.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
        username: true,
      }
    })

    if (!user) {
      throw new Error('User not found')
    }

    req.user = user
    return
  } catch (error) {
    console.error(`Error on get token: ${error}`)
    throw new Error(`Error on get token: ${error}`)
  }
}