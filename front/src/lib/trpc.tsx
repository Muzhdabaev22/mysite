import { createTRPCReact } from "@trpc/react-query";
import type { TrpcRouter } from '@ideanick/backend/src/trpc'

const trpc = createTRPCReact<TrpcTouter>{}