import { prisma } from "../../lib/prisma"

interface Props{
  userId: string
}

export class GetUserFollowersService{
  async execute({ userId }: Props){

    try {
      const followers = await prisma.followers.findMany({
        where: {
          followingId: userId
        },
        select: {
          created_at: true,
          follower: {
            select: {
              username: true
            }
          }
        },
        orderBy: {
          created_at: 'desc'
        }
      })

      const response = followers.map(follow => ({
        username: follow.follower.username,
        followingSince: follow.created_at
      }))
      
      return {
        count: response.length,
        followers: response
      }

    } catch (error) {
      console.error(`Error on find user on database: ${error}`)
      throw new Error(`Error on find user on database: ${error}`)
    }
  }
}