import { BrowserRouter, Routes, Route } from "react-router";
// Pages
import Home from "@/pages/home";
import Login from "@/pages/login";
import Logout from "@/pages/logout";
import Magazine from "@/pages/magazine";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Panel from "@/pages/panel/panel";
import useAuthListener from "./hooks/use-auth-listener";

const Router = () => {
    useAuthListener();
    const isAuthenticated = useSelector((state: RootState) => state.authentication.isAuthenticated);

    const getAuthRoutes = () => {
        if (isAuthenticated) {
            return (
                <>
                    <Route path="/panel" element={<Panel />} />
                </>
            )
        }
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route index path="/" element={<Home />} />
                <Route path="/magazine/:magazineId" element={<Magazine />} />

                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />

                {getAuthRoutes()}
            </Routes>


        </BrowserRouter>
    )
}
export default Router;