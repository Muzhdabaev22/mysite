import { cloudinaryUploadTypes } from '@mysite/shared/src/cloudinary'
import { getKeysAsArray } from '@mysite/shared/src/getKeysAsArray'
import { z } from 'zod'

export const zPrepareCloudinaryUploadTrpcInput = z.object({
  type: z.enum(getKeysAsArray(cloudinaryUploadTypes)),
})