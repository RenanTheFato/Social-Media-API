import { prisma } from "../../lib/prisma"

interface Props{
  id: string,
  content: string,
  username: string,
}

export class CreatePostService{
  async execute({ id, content, username }: Props){

    try {
      const post = await prisma.posts.create({
        data: {
          userId: id,
          content: content,
          author: username
        }
      })

      return post
    } catch (error) {
      console.error(`Error on create post on database: ${error}`)
      throw new Error(`Error on create post on database: ${error}`)
    }
  }
}