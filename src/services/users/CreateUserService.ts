import { prisma } from "../../lib/prisma"

interface UserProps {
  email: string,
  password: string
  username: string,
}

export class CreateUserService {
  async execute({ email, password, username }: UserProps) {

    try {
      await prisma.users.create({
        data: {
          email,
          password,
          username,
        }
      })

    } catch (error) {
      console.error(`Error on create user on database: ${error}`)
      throw new Error(`Error on create user on database: ${error}`)
    }
  }
}