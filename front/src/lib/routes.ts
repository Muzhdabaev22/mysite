import { pgr } from '../utils/pumpGetRoute'


export const getSignUpRoute = pgr(() => '/sign-up')

export const getSignInRoute = pgr(() => '/sign-in')

export const getSignOutRoute = pgr(() => '/sign-out')

export const getEditProfileRoute = pgr(() => '/edit-profile')

export const getAllIdeasRoute = pgr(() => '/')

export const getViewIdeaRoute = pgr({ idea: true }, ({ idea }) => `/ideas/${idea}`)

export const getEditIdeaRoute = pgr({ idea: true }, ({ idea }) => `/ideas/${idea}/edit`)

export const NewIdeaRoute = pgr(() => '/ideas/new') 
