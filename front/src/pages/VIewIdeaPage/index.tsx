import { useParams } from "react-router-dom"
import { ViewIdeaRouteParams } from "../../lib/routes"
import {trpc} from "../../lib/trpc"
import css from './index.module.scss'

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
            <h1 className={css.title}>{data.idea.name}</h1>
            <p className={css.description}>{data.idea.description}</p>
            <div className={css.text} dangerouslySetInnerHTML={{ __html: data.idea.text }} />
        </div>
    ) 
}