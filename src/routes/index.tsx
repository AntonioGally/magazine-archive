import { BrowserRouter, Routes, Route } from "react-router";
// Pages
import Home from "@/pages/home";
import Login from "@/pages/login";
import SignUp from "@/pages/signup";
import Logout from "@/pages/logout";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index path="/" element={<Home />} />
                <Route  path="/login" element={<Login />} />
                <Route  path="/signup" element={<SignUp />} />
                <Route  path="/logout" element={<Logout />} />
            </Routes>
        </BrowserRouter>
    )
}
export default Router;