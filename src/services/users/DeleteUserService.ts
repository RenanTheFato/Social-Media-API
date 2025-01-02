import { prisma } from "../../lib/prisma";

interface Props {
  id: string,
}

export class DeleteUserService {
  async execute({ id }: Props) {

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