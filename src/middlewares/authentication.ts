import { FastifyReply, FastifyRequest } from "fastify";
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
    req.user = { id }
    return
  } catch (error) {
    console.error(`Error on get token: ${error}`)
    throw new Error(`Error on get token: ${error}`)
  }
}