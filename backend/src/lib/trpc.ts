import { TrpcRouter, trpcRouter } from './../router/index';
import { initTRPC } from "@trpc/server"
import {type Express} from 'express'
import * as trpcExpress from "@trpc/server/adapters/express"
import { AppContext } from './ctx';

export const trpc = initTRPC.context<AppContext>().create()
export const applyTrpcToExpressApp = (expressApp: Express, appContext: AppContext, trpcRouter: TrpcRouter) => {
    expressApp.use(
    '/trpc', 
    trpcExpress.createExpressMiddleware({
        router: trpcRouter,
        createContext: () => appContext,
    })
)
}