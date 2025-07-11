import { z } from 'zod'
import { zEnvNonemptyTrimmed } from '../../../shared/src/zod'

export const zEnv = z.object({
    NODE_ENV: z.enum(['development', 'production']),
    VITE_BACKEND_TRPC_URL: zEnvNonemptyTrimmed,
    VITE_WEBAPP_URL: zEnvNonemptyTrimmed,
    VITE_CLOUDINARY_CLOUD_NAME: zEnvNonemptyTrimmed
})

const envFromBackend = (window as any).webappEnvFromBackend
export const env = zEnv.parse(envFromBackend?.replaceMeWithPublicEnv ? process.env : envFromBackend)