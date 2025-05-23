import { format } from 'date-fns/format'
import { useParams } from 'react-router-dom'
import { LinkButton } from '../../components/Button'
import { Segment } from '../../components/Segment'
import { getEditIdeaRoute, type ViewIdeaRouteParams } from '../../lib/routes'
import { trpc } from '../../lib/trpc'
import css from './index.module.scss'

export const ViewIdeaPage = () => {
  const { idea } = useParams() as ViewIdeaRouteParams

  const getIdeaResult = trpc.getIdea.useQuery({
    idea,
  })
  const getMeResult = trpc.getMe.useQuery()

  if (getIdeaResult.isLoading || getIdeaResult.isFetching || getMeResult.isLoading || getMeResult.isFetching) {
    return <span>Loading...</span>
  }

  if (getIdeaResult.isError) {
    return <span>Error: {getIdeaResult.error.message}</span>
  }

  if (getMeResult.isError) {
    return <span>Error: {getMeResult.error.message}</span>
  }

  if (!getIdeaResult.data.idea) {
    return <span>Idea not found</span>
  }

  const Idea = getIdeaResult.data.idea
  const me = getMeResult.data.me

  return (
    <Segment title={Idea.name} description={Idea.description}>
      <div className={css.createdAt}>Created At: {format(Idea.createdAt, 'yyyy-MM-dd')}</div>
      <div className={css.author}>Author: {Idea.author.nick}</div>
      <div className={css.text} dangerouslySetInnerHTML={{ __html: Idea.text }} />
      {me?.id === Idea.authorId && (
        <div className={css.editButton}>
          <LinkButton to={getEditIdeaRoute({ idea: Idea.nick })}>Edit Idea</LinkButton>
        </div>
      )}
    </Segment>
  )
}