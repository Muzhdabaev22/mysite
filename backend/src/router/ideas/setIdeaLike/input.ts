import {z} from 'zod'
import { zStringRequired } from '../../../../../shared/src/zod'

export const zSetIdeaLikeTrpcInput = z.object({
    ideaId: zStringRequired,
    isLikedByMe: z.boolean(), 
})