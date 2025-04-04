import { BrowserRouter, Routes, Route } from "react-router-dom"
import { TrpcProvider } from "./lib/trpc"
import { AllIdeasPage } from "./pages/AllIdeasPage"
import { ViewIdeaPage } from "./pages/VIewIdeaPage"
import { getAllIdeasRoute, getViewIdeaRoute } from "./lib/routes"

export const App = () => {
    return (
        <TrpcProvider>
            <BrowserRouter>
                <Routes>
                    <Route path={getAllIdeasRoute()} element={<AllIdeasPage />} />
                    <Route path={getViewIdeaRoute({idea: ':idea'})} element={<ViewIdeaPage />} />
                </Routes>
            </BrowserRouter>
        </TrpcProvider>
    )
}