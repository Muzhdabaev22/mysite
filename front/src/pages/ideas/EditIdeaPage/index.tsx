import { zUpdateIdeaTrpcInput } from '@mysite/backend/src/router/ideas/updateIdea/input'
import { useForm} from '../../../lib/form'
import { pick } from '@mysite/shared/src/pick'
import { useNavigate } from 'react-router-dom'
import { Alert } from '../../../components/Alert'
import { Button } from '../../../components/Button'
import { FormItems } from '../../../components/FormItems'
import { Input } from '../../../components/Input'
import { Segment } from '../../../components/Segment'
import { TextArea } from '../../../components/TextArea'
import { getEditIdeaRoute, getViewIdeaRoute } from '../../../lib/routes'
import { trpc } from '../../../lib/trpc'
import { withPageWrapper } from '../../../lib/pageWrapper'
import { canEditIdea } from '@mysite/backend/src/utils/can'
import { UploadsToCloudinary } from '../../../components/UploadsToCloudinary'


export const EditIdeaPage = withPageWrapper({
  authorizedOnly: true,
  useQuery: () => {
    const { idea } = getEditIdeaRoute.useParams()
    return trpc.getIdea.useQuery({idea}) 
  },

  setProps: ({ queryResult, ctx, checkExists, checkAccess }) => {
    const idea = checkExists(queryResult.data.idea, 'Idea not found')
    checkAccess(canEditIdea(ctx.me, idea), 'An idea can only be edited by the author')
    return {
      idea,
    }
  },
  title: ({idea}) => `Edit Idea "${idea.name}"`,
})
(({ idea }) => {
  const navigate = useNavigate()
  const updateIdea = trpc.updateIdea.useMutation()
  const {formik, alertProps, buttonProps } = useForm({
    initialValues: pick(idea, ['name', 'nick', 'description', 'text', 'images']),
    validationSchema: zUpdateIdeaTrpcInput.omit({ ideaId: true }),
    onSubmit: async (values) => {
        await updateIdea.mutateAsync({ ideaId: idea.id, ...values })
        navigate(getViewIdeaRoute({ idea: values.nick }))
    },
    resetOnSuccess: false,
    showValidationAlert: true
  })

  return (
    <Segment title={`Edit Idea: ${idea.nick}`}>
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input label="Name" name="name" formik={formik} />
          <Input label="Nick" name="nick" formik={formik} />
          <Input label="Description" name="description" maxWidth={500} formik={formik} />
          <TextArea label="Text" name="text" formik={formik} />
          <UploadsToCloudinary label="Images" name="images" type="image" preset="preview" formik={formik} />
          <Alert {...alertProps} />
          <Button {...buttonProps }>Update Idea</Button>
        </FormItems>
      </form>
    </Segment>
  )
})
