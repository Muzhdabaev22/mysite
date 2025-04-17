import { BrowserRouter, Routes, Route } from "react-router-dom"
import { TrpcProvider } from "./lib/trpc"
import { AllIdeasPage } from "./pages/AllIdeasPage"
import { ViewIdeaPage } from "./pages/VIewIdeaPage"
import { NewIdeaPage } from "./pages/NewIdeaPage"
import * as routes from "./lib/routes"
import { Layout } from './components/Layout'
import './styles/global.scss'

export const App = () => {
    return (
        <TrpcProvider>
            <BrowserRouter>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path={routes.getAllIdeasRoute()} element={<AllIdeasPage />} />
                        <Route path={routes.getViewIdeaRoute(routes.viewIdeaRouteParams)} element={<ViewIdeaPage />} />
                        <Route path={routes.NewIdeaRoute()} element={<NewIdeaPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </TrpcProvider>
    )
}