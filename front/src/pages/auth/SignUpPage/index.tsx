import { zSignUpTrpcInput } from '@mysite/backend/src/router/auth/signUp/input'
import { z } from 'zod'
import { Alert } from '../../../components/Alert'
import { Button } from '../../../components/Button'
import { FormItems } from '../../../components/FormItems'
import { Input } from '../../../components/Input'
import { Segment } from '../../../components/Segment'
import { trpc } from '../../../lib/trpc'
import Cookies from 'js-cookie'
import { useForm } from '../../../lib/form'
import { withPageWrapper } from '../../../lib/pageWrapper'
import { zPasswordsMustBeTheSame, zStringRequired } from '../../../../../shared/src/zod'

export const SignUpPage = withPageWrapper({
  redirectAuthorized: true,
  title: 'Sign up'
})(() => {
  const trpcUtils = trpc.useUtils()
  const signUp = trpc.signUp.useMutation()
  const {formik, alertProps, buttonProps} = useForm({
    initialValues: {
      nick: '',
      email: '',
      password: '',
      passwordAgain: '',
    },
    validationSchema: zSignUpTrpcInput
      .extend({
        passwordAgain: zStringRequired,
      })
      .superRefine(zPasswordsMustBeTheSame('password', 'passwordAgain')),

    onSubmit: async (values) => {
        const { token } = await signUp.mutateAsync(values)
        Cookies.set('token', token, { expires: 99999 })
        void trpcUtils.invalidate()
    },
    resetOnSuccess: false
  })

  return (
    <Segment title="Sign Up">
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input label="Nick" name="nick" formik={formik} />
          <Input label="E-mail" name="email" formik={formik} />
          <Input label="Password" name="password" type="password" formik={formik} />
          <Input label="Password again" name="passwordAgain" type="password" formik={formik} />
          <Alert {...alertProps}/>
          <Button {...buttonProps}>Sign Up</Button>
        </FormItems>
      </form>
    </Segment>
  )
})