import { prisma } from "../../lib/prisma"

interface Props {
  userId: string,
  username: string,
}

export class UpdateUsernameService {
  async execute({ userId, username }: Props) {

    try {
      await prisma.users.update({
        data: {
          username,
        },
        where: {
          id: userId
        },
      })
    } catch (error) {
      console.error(`Error on update username on database: ${error}`)
      throw new Error(`Error on update username on database: ${error}`)
    }
  }
}