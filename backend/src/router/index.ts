import { createTrpcRouter } from "../lib/trpc"
import { getIdeaTrpcRoute } from "./ideas/getIdea"
import { getIdeasTrpcRoute } from "./ideas/getIdeas"
import { createIdeaTrpcRoute } from "./ideas/createIdea"
import { signUpTrpcRoute } from "./auth/signUp"
import { signInTrpcRoute } from "./auth/signIn"
import { getMeTrpcRoute } from "./auth/getMe"
import { updateIdeaTrpcRoute } from "./ideas/updateIdea"
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server"
import { updateProfileTrpcRoute } from "./auth/updateProfile"
import { updatePasswordTrpcRoute } from "./auth/updatePassword"
import { setIdeaLikeTrpcRoute } from "./ideas/setIdeaLike"
import { blockIdeaTrpcRoute } from "./ideas/blockIdea"
import { prepareCloudinaryUploadTrpcRoute } from "./upload/prepareCloudinaryUpload"

export const trpcRouter = createTrpcRouter({
  getIdea: getIdeaTrpcRoute,
  getIdeas: getIdeasTrpcRoute,
  getMe: getMeTrpcRoute,
  createIdea: createIdeaTrpcRoute,
  signUp: signUpTrpcRoute,
  signIn: signInTrpcRoute,
  updateIdea: updateIdeaTrpcRoute,
  updateProfile: updateProfileTrpcRoute,
  updatePassword: updatePasswordTrpcRoute,
  setIdeaLike: setIdeaLikeTrpcRoute,
  blockIdea: blockIdeaTrpcRoute,
  prepareCloudinaryUpload: prepareCloudinaryUploadTrpcRoute,
})

export type TrpcRouter = typeof trpcRouter
export type TrpcRouterInput = inferRouterInputs<TrpcRouter>
export type TrpcRouterOutput = inferRouterOutputs<TrpcRouter>