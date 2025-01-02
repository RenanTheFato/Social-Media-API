import { FastifyReply, FastifyRequest } from "fastify";
import { DeleteUserService } from "../../services/users/DeleteUserService";

export class DeleteUserController{
  async handle(req: FastifyRequest, rep: FastifyReply){

    const id = req.user.id as string

    const deleteUserService = new DeleteUserService()

    try {
      await deleteUserService.execute({ id })
      return rep.status(200).send({ message: 'User successfully deleted'})  
    } catch (error) {
      return rep.code(400).send({ message: 'The deletion failed' })
    }
  }
}