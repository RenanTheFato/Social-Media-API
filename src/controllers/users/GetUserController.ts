import { FastifyReply, FastifyRequest } from "fastify";
import { GetUserService } from "../../services/users/GetUserService";

export class GetUserController{
  async handle(req: FastifyRequest, rep: FastifyReply){

    const userId = req.user.id as string

    const getUserService = new GetUserService()

    try {
      const user = await getUserService.execute({userId})
      return rep.status(200).send({ user })
    } catch (error) {
      console.error(error);
      return rep.code(400).send({ message: 'Error on get user' });
    }
  }
}