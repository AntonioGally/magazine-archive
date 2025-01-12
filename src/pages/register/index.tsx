import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DataTable } from "./data-table"
import useGetColumns from "./columns"
import useMagazineList from "../home/components/magazine-list/magazine-list.api"
import { Skeleton } from "@/components/ui/skeleton"
import { Link } from "react-router"

const Register = () => {
    const { data, isLoading } = useMagazineList();
    const { getColumns } = useGetColumns();
    
    return (
        <div className="w-full">
            <div className="flex items-center justify-between">
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                    Revistas cadastradas ({data?.length})
                </h3>
                <Link to={"/register/new"}>
                    <Button><Plus />Nova</Button>
                </Link>
            </div>
            <div className="mt-8">
                {!data || isLoading ? (
                    <Skeleton className="h-[125px] w-full mt-4" />
                ) : (
                    <DataTable data={data} columns={getColumns} />
                )}
            </div>
        </div>
    )
}

export default Register