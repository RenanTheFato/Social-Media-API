import { prisma } from "../../lib/prisma"

interface Props {
  search: string
}
export class SearchPostService {
  private normalizeText(text: string): string {
    return text
      .toLowerCase()
      .replace(/[aáàãâä]/g, '[aáàãâä]')
      .replace(/[eéèêë]/g, '[eéèêë]')
      .replace(/[iíìîï]/g, '[iíìîï]')
      .replace(/[oóòõôö]/g, '[oóòõôö]')
      .replace(/[uúùûü]/g, '[uúùûü]')
      .replace(/(\w)/g, '$1+')
  }

  async execute({ search }: Props) {
    try {
      const normalizedSearch = this.normalizeText(search);

      const post = await prisma.$queryRaw`
        SELECT 
          p.*, 
          COALESCE(
            json_agg(
              jsonb_build_object(
                'id', c.id,
                'content', c.content,
                'author', c.author,
                'created_at', c.created_at
              )
            ) FILTER (WHERE c.id IS NOT NULL), 
            '[]'
          ) AS comments
        FROM posts p
        LEFT JOIN comments c ON c."postId" = p.id
        WHERE 
          p.author ILIKE ${`%${search}%`}
          OR p.content ~* ${normalizedSearch}
        GROUP BY p.id
        ORDER BY p.created_at DESC
      `;

      return post;
    } catch (error) {
      console.error(`Error on search post on database: ${error}`)
      throw new Error(`Error on search post on database: ${error}`)
    }
  }
}