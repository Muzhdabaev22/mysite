import { trpc } from "../lib/trpc"
import { getIdeaTrpcRoute } from "./getIdea"
import { getIdeasTrpcRoute } from "./getIdeas"
import { createIdeaTrpcRoute } from "./createIdea"
import { signUpTrpcRoute } from "./signUp"
import { signInTrpcRoute } from "./signIn"
import { getMeTrpcRoute } from "./getMe"

export const trpcRouter = trpc.router({
  getIdea: getIdeaTrpcRoute,
  getIdeas: getIdeasTrpcRoute,
  getMe: getMeTrpcRoute,
  createIdea: createIdeaTrpcRoute,
  signUp: signUpTrpcRoute,
  signIn: signInTrpcRoute,

})

export type TrpcRouter = typeof trpcRouter