import { prisma } from "../../lib/prisma"

interface Props {
  id: string,
}

export class DeleteUserService {
  async execute({ id }: Props) {

    const user = await prisma.users.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new Error("User not found.")
    }

    try {
      await prisma.users.delete({
        where: {
          id,
        },
      })
    } catch (error) {
      console.error(`Error on delete user on database: ${error}`)
      throw new Error(`Error on delete user on database: ${error}`)
    }
  }
}