import { FastifyReply, FastifyRequest } from "fastify"
import { GetUserFollowersService } from "../../services/users/GetUserFollowersService"

export class GetUserFollowersController{
  async handle(req: FastifyRequest, rep: FastifyReply){

    const userId = req.user.id as string

    const getUserFollowersService = new GetUserFollowersService()

    try {
      const followers = await getUserFollowersService.execute({userId})
      return rep.status(200).send({ followers })
    } catch (error) {
      console.error(error)
      return rep.code(400).send({ message: 'Error on get user followers' })
    }
  }
}