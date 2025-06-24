import { z } from 'zod'
import { zStringRequired } from '../../../../../shared/src/zod'

export const zGetIdeaTrpcInput = z.object({
    idea: zStringRequired
})