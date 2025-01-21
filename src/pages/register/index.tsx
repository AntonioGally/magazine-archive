import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DataTable } from "./data-table"
import useGetColumns from "./columns"
import useMagazineList from "../home/components/magazine-list/magazine-list.api"
import { Skeleton } from "@/components/ui/skeleton"
import { Link } from "react-router"
import { TooltipProvider } from "@/components/ui/tooltip"

const Register = () => {
    const { data, isLoading } = useMagazineList();
    const { getColumns } = useGetColumns();

    return (
        <div className="w-full">
            <div className="flex items-center justify-between">
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                    Registered Articles ({data?.length})
                </h3>
                <Link to={"/register/new"}>
                    <Button><Plus />New</Button>
                </Link>
            </div>
            <div className="mt-8" style={{ width: "calc(100vw - 18rem)" }}>
                <TooltipProvider>
                    {!data || isLoading ? (
                        <Skeleton className="h-[125px] w-full mt-4" />
                    ) : (
                        <DataTable data={data} columns={getColumns} />
                    )}
                </TooltipProvider>
            </div>
        </div>
    )
}

export default Register