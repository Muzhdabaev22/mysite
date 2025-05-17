import { trpc } from "../../lib/trpc"
import { Link } from "react-router-dom"
import { getViewIdeaRoute } from "../../lib/routes"
import css from './index.module.scss'
import { Segment } from "../../components/Segment"

export const AllIdeasPage = () => {
    const { data, error, isLoading, isFetching, isError } = trpc.getIdeas.useQuery()
    
    if (isLoading || isFetching) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>Error: {error.message}</div>
    }
    
    return (
        <Segment title="All ideas">
          <div className={css.ideas}>
            {data.ideas.map((idea) => (
              <div className={css.idea} key={idea.nick}>
                <Segment size={2} 
                  title={
                    <Link className={css.ideaLink} to={getViewIdeaRoute({ idea: idea.nick })}>
                      {idea.name}
                    </Link>
                  }
                  description={idea.description}
                  />
              </div>
            ))}
          </div>
        </Segment>
      )
} 