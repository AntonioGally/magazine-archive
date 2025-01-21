import { Button } from "@/components/ui/button";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { Link } from "react-router";

const Header = () => {
    const isAuthenticated = useSelector((state: RootState) => state.authentication.isAuthenticated);

    return (
        <div className="flex items-center justify-between">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                Index of Brazilian historical journals
            </h1>
            <div>
                <Link to={"/login"}>
                    <Button className="mt-2 md:ml-2 md:mt-0" variant={"default"}>{isAuthenticated ? "Panel" : "Login"}</Button>
                </Link>
            </div>
        </div>
    )
}
export default Header;