import { z } from 'zod'
import { zCreateIdeaTrpcInput } from '../createIdea/input'
import { zStringRequired } from '../../../../../shared/src/zod'


export const zUpdateIdeaTrpcInput = zCreateIdeaTrpcInput.extend({
    ideaId: zStringRequired,
})