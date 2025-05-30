const getRouteParams = <T extends Record<string, boolean>>(object: T) => {
    return Object.keys(object).reduce((acc, key) => ({ ...acc, [key]: `:${key}` }), {}) as Record<keyof T, string>
}


export const getAllIdeasRoute = () => "/"
export const NewIdeaRoute = () => "/ideas/new"
export const viewIdeaRouteParams = getRouteParams({idea: true})
export type ViewIdeaRouteParams= typeof viewIdeaRouteParams
export const getViewIdeaRoute = ({idea}: ViewIdeaRouteParams) => `/ideas/${idea}`
export const getSignUpRoute = () => '/sign-up'
export const getSignInRoute = () => '/sign-in'
export const getSignOutRoute = () => '/sign-out'

export const editIdeaRouteParams = getRouteParams({ idea: true})
export type EditIdeaRouteParams = typeof viewIdeaRouteParams
export const getEditIdeaRoute = ({ idea }: EditIdeaRouteParams) => `/ideas/${idea}/edit`

export const getEditProfileRoute = () => '/edit-profile'