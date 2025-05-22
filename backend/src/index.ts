import express from "express"
import { trpcRouter } from "./router/index"
import cors from "cors"
import { applyTrpcToExpressApp } from "./lib/trpc"
import { AppContext, createAppContext } from "./lib/ctx"
import { applyPassportToExpressApp } from "./lib/passport"
import { env } from './lib/env'

void (async () => {
    let ctx: AppContext | null = null
    try {
        ctx = createAppContext()
        const expressApp = express()
        expressApp.use(cors())

        expressApp.get('/ping', (req, res) => {
            res.send('pong')
        })
        applyPassportToExpressApp(expressApp, ctx)
        
        await applyTrpcToExpressApp(expressApp, ctx, trpcRouter)

        expressApp.listen(env.PORT, () => {
            console.info('server is running on port 3000')
        })
     } catch (error) {
         console.error(error)
         await ctx?.stop()
    }
})()