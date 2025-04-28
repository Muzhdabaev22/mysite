import express from "express"
import { trpcRouter } from "./router/index"
import cors from "cors"
import { applyTrpcToExpressApp } from "./lib/trpc"

const expressApp = express()
expressApp.use(cors())

expressApp.get('/ping', (req, res) => {
    res.send('pong')
})

applyTrpcToExpressApp(expressApp, trpcRouter)

expressApp.listen(3000, () => {
    console.info('server is running on port 3000')
})

