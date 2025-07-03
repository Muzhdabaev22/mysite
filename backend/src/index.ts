import { env } from './lib/env'
import express from "express"
import { trpcRouter } from "./router/index"
import cors from "cors"
import { applyTrpcToExpressApp } from "./lib/trpc"
import { AppContext, createAppContext } from "./lib/ctx"
import { applyPassportToExpressApp } from "./lib/passport"
import { presetDb } from "./scripts/presetDb"
import { applyCron } from "./lib/cron"
import { logger } from './lib/logger'
import { applyServeWebApp } from './lib/serveWebApp'

void (async () => {
    let ctx: AppContext | null = null
    try {
        ctx = createAppContext()
        await presetDb(ctx)
        const expressApp = express()
        expressApp.use(cors())

        expressApp.get('/ping', (req, res) => {
            res.send('pong')
        })
        applyPassportToExpressApp(expressApp, ctx)
        
        await applyTrpcToExpressApp(expressApp, ctx, trpcRouter)
        applyCron(ctx)
        await applyServeWebApp(expressApp)
        expressApp.use((error: unknown, req: express.Request, res: express.Response, next: express.NextFunction) => {
            const normalizedError = error instanceof Error ? error : new Error(String(error))
            logger.error('express', normalizedError)
            if (res.headersSent) {
                next(error)
                return
            }
            res.status(500).send('Internal server error')
        })

        expressApp.listen(env.PORT, () => {
            logger.info('express', `Listening at http://localhost:${env.PORT}`)
        })
        
     } catch (error) {
        const normalizedError = error instanceof Error ? error : new Error(String(error))
        logger.error('app', normalizedError)
        await ctx?.stop()
    }
})()