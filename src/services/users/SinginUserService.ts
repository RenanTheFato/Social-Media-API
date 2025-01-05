import { prisma } from "../../lib/prisma"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

interface Props{
  email: string,
  password: string,
}

export class SinginUserService{
  async execute({ email, password }: Props){

    const isUserExists = await prisma.users.findFirst({
      where: {
        email
      }
    })

    if (!isUserExists) {
      throw new Error("Invalid email or password.")
    }

    const isPasswordCorrect = await bcrypt.compare(password, isUserExists.password)

    if (!isPasswordCorrect) {
      throw new Error("Invalid email or password.")
    }

    const token = jwt.sign({ id: isUserExists.id}, String(process.env.JWT_PASSWORD), {expiresIn: '12h'})

    return {
      token: token,
    }
  }
}