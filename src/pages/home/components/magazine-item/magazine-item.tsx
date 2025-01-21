import { Link } from "react-router";
import { Magazine } from "../../../../types";
import { Eye } from "lucide-react";

const MagazineItem = ({ title, author, abstract, id, views }: Magazine) => {

    function formatAbstract(abstract: string) {
        return abstract.length > 180 ? `${abstract.slice(0, 180)}...` : abstract
    }

    return (
        <Link to={`/magazine/${id}`} className="block">
            <div className="w-full mb-5 transition-opacity hover:opacity-50">
                <div className="mb-2">
                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                        {title}
                    </h3>
                    <p className="flex items-center gap-x-4 text-sm text-muted-foreground">
                        {author.join("; ")}
                        <span className="flex items-center gap-x-1">
                            <Eye size={16} /> {views}
                        </span>
                    </p>

                </div>

                <p className="leading-7">
                    {formatAbstract(abstract)}
                </p>

                <div className="h-[1px] w-full bg-slate-200 mt-3" />
            </div>
        </Link>
    )
}

export default MagazineItem;