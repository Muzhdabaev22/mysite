import { trpc } from "../lib/trpc"
import { getIdeaTrpcRoute } from "./getIdea"
import { getIdeasTrpcRoute } from "./getIdeas"
import { createIdeaTrpcRoute } from "./createIdea"
import { signUpTrpcRoute } from "./signUp"
import { signInTrpcRoute } from "./signIn"
import { getMeTrpcRoute } from "./getMe"
import { updateIdeaTrpcRoute } from "./updateIdea"
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server"

export const trpcRouter = trpc.router({
  getIdea: getIdeaTrpcRoute,
  getIdeas: getIdeasTrpcRoute,
  getMe: getMeTrpcRoute,
  createIdea: createIdeaTrpcRoute,
  signUp: signUpTrpcRoute,
  signIn: signInTrpcRoute,
  updateIdea: updateIdeaTrpcRoute
})

export type TrpcRouter = typeof trpcRouter
export type TrpcRouterInput = inferRouterInputs<TrpcRouter>
export type TrpcRouterOutput = inferRouterOutputs<TrpcRouter>