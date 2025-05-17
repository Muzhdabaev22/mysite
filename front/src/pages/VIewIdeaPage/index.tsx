import { useParams } from "react-router-dom"
import { ViewIdeaRouteParams } from "../../lib/routes"
import {trpc} from "../../lib/trpc"
import css from './index.module.scss'
import { Segment } from "../../components/Segment"
import format from 'date-fns/format'

export const ViewIdeaPage = () => {
    const {idea} = useParams() as ViewIdeaRouteParams
    
    
    const { data, error, isLoading, isFetching, isError } = trpc.getIdea.useQuery({
        idea
    })

    if (isLoading || isFetching) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>Error: {error.message}</div>
    }

    if(!data.idea) {
        return <span>Idea not found</span>
    }

    return (
        <div>
            <Segment title={data.idea.name} description={data.idea.description}>
                <div className={css.createdAt}>Created At: {format(data.idea.createdAt, 'yyyy-MM-dd')}</div>
                <div className={css.text} dangerouslySetInnerHTML={{ __html: data.idea.text }} />
            </Segment>            
        </div>
    ) 
}