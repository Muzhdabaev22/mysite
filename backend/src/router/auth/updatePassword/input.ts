import { z } from 'zod'
import { zStringRequired } from '../../../../../shared/src/zod'

export const zUpdatePasswordTrpcInput = z.object({
    oldPassword: zStringRequired,
    newPassword: zStringRequired,
})