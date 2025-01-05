import { prisma } from "../../lib/prisma"

interface Props {
  userId: string,
  followerId: string
}

interface ReturnMessage {
  action: 'Followed' | 'Unfollowed',
  message: string
}

export class SetUserFollowersService {
  async execute({ userId, followerId }: Props) {

    if (userId === followerId) {
      throw new Error("You can't follow yourself")
    }

    try {
      const userToFollow = await prisma.users.findUnique({
        where: {
          id: followerId
        }
      })

      if (!userToFollow) {
        throw new Error("User to follow not found")
      }

      const existingFollower = await prisma.followers.findUnique({
        where: {
          followerId_followingId: {
            followerId: userId,
            followingId: followerId,
          }
        }
      })

      if (existingFollower) {
        await prisma.followers.delete({
          where: {
            id: existingFollower.id
          }
        })

        return {
          action: 'Unfollowed',
          message: 'You unfollowed this user'
        }
      }

      await prisma.followers.create({
        data: {
          followerId: userId,
          followingId: followerId
        }
      })

      return {
        action: 'Followed',
        message: 'You start to follow this user'
      }
    } catch (error) {
      console.error(`Error on follower on database: ${error}`)
      throw new Error(`Error on follower on database: ${error}`)
    }

  }
}