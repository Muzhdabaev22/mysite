import * as dotenv from 'dotenv'
import { z } from 'zod'

dotenv.config()

const zNoneemptyTrimmed = z.string().trim().min(1)

const zNonemptyTrimmedRequiredOnNotLocal = zNoneemptyTrimmed.optional().refine(
  // eslint-disable-next-line node/no-process-env
  (val) => process.env.HOST_ENV === 'local' || !!val,
  'Required on local host'
)

const zEnv = z.object({
    PORT: zNoneemptyTrimmed,
    HOST_ENV: z.enum(['local', 'production']),
    DATABASE_URL: zNoneemptyTrimmed,
    JWT_SECRET: zNoneemptyTrimmed,
    PASSWORD_SALT: zNoneemptyTrimmed,
    INITIAL_ADMIN_PASSWORD: zNoneemptyTrimmed,
    WEBAPP_URL: zNoneemptyTrimmed,
//   BREVO_API_KEY: zNonemptyTrimmedRequiredOnNotLocal,
//   FROM_EMAIL_NAME: zNoneemptyTrimmed,
//   FROM_EMAIL_ADDRESS: zNoneemptyTrimmed,
})

// eslint-disable-next-line node/no-process-env
export const env = zEnv.parse(process.env)
