import { z } from 'zod'
import { ideas } from '../../lib/ideas'
import { trpc } from '../../lib/trpc'
 
export const getIdeaTrpcRoute = trpc.procedure.input(
    z.object({
      idea: z.string(),
    })
  ).query(({input}) => {
    const idea = ideas.find((idea) => idea.nick === input.idea)
    return { idea : idea || null}
  })