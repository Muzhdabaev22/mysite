import { BrowserRouter, Routes, Route } from "react-router-dom"
import { TrpcProvider } from "./lib/trpc"
import { AllIdeasPage } from "./pages/ideas/AllIdeasPage"
import { ViewIdeaPage } from "./pages/ideas/ViewIdeaPage"
import { NewIdeaPage } from "./pages/ideas/NewIdeaPage"
import * as routes from "./lib/routes"
import { Layout } from './components/Layout'
import './styles/global.scss'
import { SignUpPage } from "./pages/auth/SignUpPage"
import { SignInPage } from "./pages/auth/SignInPage"
import { SignOutPage } from "./pages/auth/SignOutPage"
import { EditIdeaPage } from "./pages/ideas/EditIdeaPage"
import { AppContextProvider } from "./lib/ctx"
import { NotFoundPage } from "./pages/other/NotFoundPage"
import { EditProfilePage } from "./pages/auth/EditProfilePage"
import { HelmetProvider } from "react-helmet-async"

export const App = () => {
    return (
        <HelmetProvider>
            <TrpcProvider>
                <AppContextProvider>
                    <BrowserRouter>
                       <Routes>
                            <Route path={routes.getSignOutRoute.definition} element={<SignOutPage />} />
                            <Route element={<Layout />}>
                                <Route path={routes.getSignUpRoute.definition} element={<SignUpPage />} />
                                <Route path={routes.getSignInRoute.definition} element={<SignInPage />} />
                                <Route path={routes.getEditProfileRoute.definition} element={<EditProfilePage />} />
                                <Route path={routes.getAllIdeasRoute.definition} element={<AllIdeasPage />} />
                                <Route path={routes.getViewIdeaRoute.definition} element={<ViewIdeaPage />} />
                                <Route path={routes.getEditIdeaRoute.definition} element={<EditIdeaPage />} />
                                <Route path={routes.NewIdeaRoute.definition} element={<NewIdeaPage />} />
                                <Route path="*" element={<NotFoundPage />} />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </AppContextProvider>
            </TrpcProvider>
        </HelmetProvider>
    )
}