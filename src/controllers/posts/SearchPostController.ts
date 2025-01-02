import { FastifyReply, FastifyRequest } from "fastify";
import { SearchPostService } from "../../services/posts/SearchPostService";

interface Props{
  search: string
}

export class SearchPostController{
  async handle(req: FastifyRequest, rep: FastifyReply){

    const search = req.query as Props

    if (!search.search) {
      return rep.status(400).send({ message: 'Search parameter required'})
    }

    const searchPostService = new SearchPostService()

    try {
      const post = await searchPostService.execute(search)
      return rep.code(200).send(post)
    } catch (error) {
      return rep.code(400).send({ message: 'Error on search post' });
    }
  }
}