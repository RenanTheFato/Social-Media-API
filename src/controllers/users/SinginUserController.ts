import { FastifyReply, FastifyRequest } from "fastify";
import { SinginUserService } from "../../services/users/SinginUserService";

interface Props{
  email: string,
  password: string,
}

export class SinginUserController{
  async handle(req: FastifyRequest, rep: FastifyReply){

    const { email, password } = req.body as Props

    const singinUserService = new SinginUserService()

    try {
      const user = await singinUserService.execute({ email, password })
      return rep.status(200).send({user})
    } catch (error) {
      console.error(error);
      return rep.code(401).send({ message: 'Credentials failed' })
    }
  }
}