import { Segment } from '../../components/Segment'
import { Input } from '../../components/Input'
import { TextArea } from '../../components/TextArea'
import { useFormik } from 'formik'
import { withZodSchema } from 'formik-validator-zod'
import { trpc } from '../../lib/trpc'
import { zCreateIdeaTrpcInput } from '@mysite/backend/src/router/createIdea/input'
import { useState } from 'react'
import { Alert } from '../../components/Alert'
import { Button } from '../../components/Button'
import { FormItems } from '../../components/FormItems'

export const NewIdeaPage = () => {
    const [successMessageVisible, setSuccessMessageVisible] = useState(false)
    const [submittingError, setSubmittingError] = useState<string | null>(null)
    const createIdea = trpc.createIdea.useMutation()
    const formik = useFormik({
      initialValues: {
        name: '', 
        nick: '', 
        description: '', 
        text: '',
      },
      validate: withZodSchema(
        zCreateIdeaTrpcInput
      ),
      onSubmit: async (values) => {
        try {
          await createIdea.mutateAsync(values)
          formik.resetForm()
          setSuccessMessageVisible(true)
          setTimeout(() => {
            setSuccessMessageVisible(false)
          }, 3000)
        } catch (error: any) {
          setSubmittingError(error.message)
          setTimeout(() => {
            setSubmittingError(null)
          }, 3000)
        }
      }
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
          {!formik.isValid && !!formik.submitCount && <div style={{ color: 'red' }}>Some fields are invalid</div>}
          {successMessageVisible && <Alert color='green'>Idea created!</Alert>}
          {submittingError && <Alert color='red'>{submittingError}</Alert>}
          <Button loading={formik.isSubmitting}>Create Idea</Button>
        </FormItems>
        </form>
      </Segment>
    )
}