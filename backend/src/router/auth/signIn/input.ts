import {z} from 'zod'
import { zStringRequired } from '../../../../../shared/src/zod'

export const zSignInTrpcInput = z.object({
    nick: zStringRequired,
    password: zStringRequired
})
