import css from './index.module.scss'
import { Segment } from '../../components/Segment'
import { Input } from '../../components/Input'
import { TextArea } from '../../components/TextArea'
import { useFormik } from 'formik'


export const NewIdeaPage = () => {
    // const [state, setState] = useState({
    //   name: '',
    //   nick: '',
    //   description: '',
    //   text: '',
    // })
  
    const formik = useFormik({
      initialValues: {
        name: '', 
        nick: '', 
        description: '', 
        text: '',
      },
      onSubmit: (values) => {
        console.info('Submitted', values)
      },
    
    })

    return (
      <Segment title="New Idea">
        <form
          onSubmit={(e) => {
          e.preventDefault()
          formik.handleSubmit()}}>
        
        <Input name='name' label='Name' formik={formik} />
        <Input name='nick' label='Nick' formik={formik} />
        <Input name='description' label='Desctiption' formik={formik} />
        <TextArea name='text' label='Name' formik={formik} />
  
        <button type="submit">Create Idea</button>
        </form>
      </Segment>
    )
}