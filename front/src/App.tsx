import { BrowserRouter, Routes, Route } from "react-router-dom"
import { TrpcProvider } from "./lib/trpc"
import { AllIdeasPage } from "./pages/AllIdeasPage"
import { ViewIdeaPage } from "./pages/VIewIdeaPage"
import { getAllIdeasRoute, getViewIdeaRoute, viewIdeaRouteParams } from "./lib/routes"
import { Layout } from './components/Layout'
import './styles/global.scss'

export const App = () => {
    return (
        <TrpcProvider>
            <BrowserRouter>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path={getAllIdeasRoute()} element={<AllIdeasPage />} />
                        <Route path={getViewIdeaRoute(viewIdeaRouteParams)} element={<ViewIdeaPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </TrpcProvider>
    )
}