import { BrowserRouter, Routes, Route } from "react-router";
// Pages
import Home from "@/pages/home";
import Login from "@/pages/login";
import Logout from "@/pages/logout";
import Magazine from "@/pages/magazine";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index path="/" element={<Home />} />
                <Route path="/magazine/:magazineId" element={<Magazine />} />
                
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
            </Routes>

        </BrowserRouter>
    )
}
export default Router;