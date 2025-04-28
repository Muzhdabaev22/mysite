import { TrpcRouter, trpcRouter } from './../router/index';
import { initTRPC } from "@trpc/server"
import {type Express} from 'express'
import * as trpcExpress from "@trpc/server/adapters/express"

export const trpc = initTRPC.create()
export const applyTrpcToExpressApp = (expressApp: Express, trpcRouter: TrpcRouter) => {
    expressApp.use(
    '/trpc', 
    trpcExpress.createExpressMiddleware({
        router: trpcRouter,
    })
)
}