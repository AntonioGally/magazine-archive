// Libs
import { BrowserRouter, Routes, Route } from "react-router";
import { useSelector } from "react-redux";
import useAuthListener from "./hooks/use-auth-listener";
// Types
import { RootState } from "@/store";
// Pages
import Home from "@/pages/home";
import Login from "@/pages/login";
import Logout from "@/pages/logout";
import Magazine from "@/pages/magazine";
import Panel from "@/pages/panel";
import Register from "@/pages/register";
// Layout
import Layout from "@/layouts/panel-layout";
import MagazineRegister from "@/pages/register/magazine-register/magazine-register";


const Router = () => {
    useAuthListener();
    const isAuthenticated = useSelector((state: RootState) => state.authentication.isAuthenticated);

    const getAuthRoutes = () => {
        if (isAuthenticated) {
            return (
                <>
                    <Route element={<Layout />}>
                        <Route path="/panel" element={<Panel />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/register/new" element={<MagazineRegister />} />
                        <Route path="/register/:magazineId" element={<MagazineRegister />} />
                    </Route>
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