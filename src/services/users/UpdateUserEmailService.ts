import { prisma } from "../../lib/prisma";

interface Props {
  userId: string,
  email: string,
}

export class UpdateUserEmailService {
  async execute({ userId, email }: Props) {

    try {
      await prisma.users.update({
        data: {
          email,
        },
        where: {
          id: userId
        },
      })
    } catch (error) {
      console.error(`Error on update user email on database: ${error}`)
      throw new Error(`Error on update user email on database: ${error}`)
    }
  }
}