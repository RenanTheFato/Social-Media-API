import { prisma } from "../../lib/prisma"

interface Props {
  userId: string,
  postId: string,
  content: string,
  username: string,
}

export class CreateCommentService {
  async execute({ userId, postId ,content, username }: Props) {

    try {

      const post = await prisma.posts.findUnique({
        where: {
          id: postId,
        },
      })

      if (!post) {
        throw new Error("Post not found.")
      }
      
      const comment = await prisma.comments.create({
        data: {
          postId: postId,
          userId: userId,
          content: content,
          author: username
        }
      })

      return comment
    } catch (error) {
      console.error(`Error on create post on database: ${error}`)
      throw new Error(`Error on create post on database: ${error}`)
    }
  }
}