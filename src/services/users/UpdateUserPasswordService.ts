import { prisma } from "../../lib/prisma"

interface Props{
  userId: string,
  password: string
}

export class UpdateUserPasswordService{
  async execute({ userId, password }: Props){

    try {
      await prisma.users.update({
        data: {
          password,
        },
        where: {
          id: userId
        }
      })
    } catch (error) {
      console.error(`Error on update user password on database: ${error}`)
      throw new Error(`Error on update user password on database: ${error}`)
    }
  }
}