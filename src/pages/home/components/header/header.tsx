import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const Header = () => {
    return (
        <div className="flex items-center justify-between">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                Revistas indexadas
            </h1>
            <div>
                <Link to={"/login"}>
                    <Button className="mt-2 md:ml-2 md:mt-0" variant={"default"}>Login</Button>
                </Link>
            </div>
        </div>
    )
}
export default Header;