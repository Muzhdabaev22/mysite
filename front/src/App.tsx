import { BrowserRouter, Routes, Route } from "react-router-dom"
import { TrpcProvider } from "./lib/trpc"
import { AllIdeasPage } from "./pages/AllIdeasPage"
import { ViewIdeaPage } from "./pages/VIewIdeaPage"
import { NewIdeaPage } from "./pages/NewIdeaPage"
import * as routes from "./lib/routes"
import { Layout } from './components/Layout'
import './styles/global.scss'
import { SignUpPage } from "./pages/SignUpPage"
import { SignInPage } from "./pages/SignInPage"
import { SignOutPage } from "./pages/SignOutPage"

export const App = () => {
    return (
        <TrpcProvider>
            <BrowserRouter>
                <Routes>
                        <Route path={routes.getSignOutRoute()} element={<SignOutPage />} />
                    <Route element={<Layout />}>
                        <Route path={routes.getAllIdeasRoute()} element={<AllIdeasPage />} />
                        <Route path={routes.getViewIdeaRoute(routes.viewIdeaRouteParams)} element={<ViewIdeaPage />} />
                        <Route path={routes.NewIdeaRoute()} element={<NewIdeaPage />} />
                        <Route path={routes.getSignUpRoute()} element={<SignUpPage />} />
                        <Route path={routes.getSignInRoute()} element={<SignInPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </TrpcProvider>
    )
}