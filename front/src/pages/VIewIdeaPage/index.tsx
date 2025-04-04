import { useParams } from "react-router-dom"

export const ViewIdeaPage = () => {
    const {idea} = useParams() as {idea: string}
    return (
        <div>
            <h1>{idea}</h1>
            <p></p>
            <div>
                <p>2</p>
                <p>1</p>
                <p>3</p>
            </div>
        </div>
    )
}