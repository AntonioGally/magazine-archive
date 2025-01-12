// Libs
import { Link, useParams } from "react-router"
// Components
import { Button } from "@/components/ui/button";
// Assets
import { ArrowLeft, FileText } from "lucide-react"
// Scripts
import { useGetMagazine, useViewMagazine } from "./magazine.api"
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect } from "react";

const Magazine = () => {
    const { magazineId } = useParams<{ magazineId: string }>()

    const { data, isLoading } = useGetMagazine(magazineId);

    const { mutate } = useViewMagazine(magazineId);

    useEffect(() => {
        if (!isLoading && data) {
            mutate(data.views)
        }
    }, [isLoading])

    if (!data || isLoading) return <Skeleton />

    return (
        <div className="p-4 lg:p-10 max-w-[1400px] mx-auto">
            {/* header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="flex flex-col md:flex-row md:items-center">
                    <Link to={"/"}>
                        <Button className="mr-4" variant={"outline"}><ArrowLeft />Go Back</Button>
                    </Link>
                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                        {data.title}
                    </h3>
                </div>
                <div className="flex items-center space-x-2 ">
                    <Link to={data.pdf_link} target="_blank">
                        <FileText size={28} className="text-slate-500 cursor-pointer" />
                    </Link>
                </div>
            </div>
            {/* content */}
            <div className="mt-8 space-y-4">
                <div>
                    <span className="font-semibold text-lg">Authors:</span>
                    <p className="leading-7">{data.author.join("; ")}</p>
                </div>
                <div>
                    <span className="font-semibold text-lg">Abstract:</span>
                    <p className="leading-7">{data.abstract}</p>
                </div>
                <div>
                    <span className="font-semibold text-lg break-words">Reference:</span>
                    <p className="leading-7">{data.source}</p>
                </div>
            </div>
        </div>
    )
}

export default Magazine;