import { FastifyReply, FastifyRequest } from "fastify"
import { SetUserFollowersService } from "../../services/users/SetUserFollowersService"

export class SetUserFollowersController{
  async handle(req: FastifyRequest, rep: FastifyReply){

    const userId = req.user.id as string
    const { followerId } = req.query as { followerId: string }

    try {
      const setUserFollowersService = new SetUserFollowersService()
      const result = await setUserFollowersService.execute({ userId, followerId })
      return rep.status(200).send({ message: result })
    } catch (error) {
      console.error(error);
      return rep.code(400).send({ message: 'Registration failed' })
    }
  }
}