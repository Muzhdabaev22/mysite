import { z } from 'zod'
import { zNickRequired } from '../../../../../shared/src/zod'

export const zUpdateProfileTrpcInput = z.object({
    nick: zNickRequired,
    name: z.string().max(50).default(''),
    avatar: z.string().nullable(),
})