import { Segment } from '../../../components/Segment'
import { Input } from '../../../components/Input'
import { TextArea } from '../../../components/TextArea'
import { useForm } from '../../../lib/form'
import { trpc } from '../../../lib/trpc'
import { zCreateIdeaTrpcInput } from '@mysite/backend/src/router/ideas/createIdea/input'
import { Alert } from '../../../components/Alert'
import { Button } from '../../../components/Button'
import { FormItems } from '../../../components/FormItems'
import { withPageWrapper } from '../../../lib/pageWrapper'
import { UploadsToCloudinary } from '../../../components/UploadsToCloudinary'


export const NewIdeaPage = withPageWrapper({
  authorizedOnly: true,
  title: 'New Idea',
})(() => {
    const createIdea = trpc.createIdea.useMutation()
    const { formik, buttonProps, alertProps } = useForm({
      initialValues: {
        name: '', 
        nick: '', 
        description: '', 
        text: '',
        images: [],
      },
      validationSchema: zCreateIdeaTrpcInput,
      onSubmit: async (values) => {
        await createIdea.mutateAsync(values)
        formik.resetForm()
      },
      successMessage: 'Idea created!',
      showValidationAlert: true
    })

    return (
      <Segment title="New Idea">
        <form
          onSubmit={(e) => {
          e.preventDefault()
          formik.handleSubmit()}}>
        <FormItems>
          <Input name='name' label='Name' formik={formik} />
          <Input name='nick' label='Nick' formik={formik} />
          <Input name='description' label='Desctiption' formik={formik} />
          <TextArea name='text' label='Text' formik={formik} maxWidth={500}/>
          <UploadsToCloudinary label="Images" name="images" type="image" preset="preview" formik={formik} />
          <Alert {...alertProps} />
          <Button {...buttonProps}>Create idea</Button>
        </FormItems>
        </form>
      </Segment>
    )
})