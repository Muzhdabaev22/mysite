import {z} from 'zod'
import { zStringRequired } from '../../../../../shared/src/zod'

export const zBlockIdeaTrpcInput = z.object({
    ideaId: zStringRequired,
})