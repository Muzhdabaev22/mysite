import { z } from 'zod'
import { trpc } from '../../../lib/trpc'
 
export const getIdeaTrpcRoute = trpc.procedure.input(
    z.object({
      idea: z.string(),
    })
  ).query(async ({ctx, input}) => {
    const idea = await ctx.prisma.idea.findUnique({
      where: {
        nick: input.idea,
      },
      include: {
        author: {
          select: {
            id: true,
            nick: true,
            name: true,
          }
        }
      }
    })

    return {idea}
  })