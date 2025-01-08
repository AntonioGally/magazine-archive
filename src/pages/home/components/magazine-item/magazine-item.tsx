import { Link } from "react-router";
import { Magazine } from "../../../../types";

const MagazineItem = ({ title, author, abstract, id }: Magazine) => {
    function formatBastract(abstract: string) {
        return abstract.length > 180 ? `${abstract.slice(0, 180)}...` : abstract
    }
    return (
        <Link to={`/magazine/${id}`} className="block">
            <div className="w-full mb-5 transition-opacity hover:opacity-50">
                <div className="mb-2">
                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                        {title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        {author.join("; ")}
                    </p>
                </div>

                <p className="leading-7">
                    {formatBastract(abstract)}
                </p>

                <div className="h-[1px] w-full bg-slate-200 mt-3" />
            </div>
        </Link>
    )
}

export default MagazineItem;