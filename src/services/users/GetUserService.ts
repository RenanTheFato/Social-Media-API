import { prisma } from "../../lib/prisma"

interface Props{
  userId: string
}

export class GetUserService{
  async execute({ userId }: Props){

    try {
      const user = await prisma.users.findUnique({
        where: {
          id: userId
        }
      })
      return user
    } catch (error) {
      console.error(`Error on find user on database: ${error}`)
      throw new Error(`Error on find user on database: ${error}`)
    }
  }
}