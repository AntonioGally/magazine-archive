import { useEffect } from "react";
import { queryClient } from "@/main";
import { useDispatch } from "react-redux";
import { logout } from "@/store/slices/authentication";
import { useNavigate } from "react-router";
import { signOut } from "firebase/auth";
import { auth } from "@/config/firebase";

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    useEffect(() => {
        queryClient.clear();
        dispatch(logout());
        signOut(auth).finally(() => {
            navigate("/")
        })
    }, [dispatch, navigate]);

    return null;
}

export default Logout;