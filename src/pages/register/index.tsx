import { Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "./data-table";
import useGetColumns from "./hooks/columns";
import useMagazineList from "../home/components/magazine-list/magazine-list.api";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router";
import { TooltipProvider } from "@/components/ui/tooltip";
import useGetTotalCount from "./hooks/use-get-total-count";
import useDownloadCSV from "./hooks/use-download-csv";

const Register = () => {
    const {
        data,
        isLoading,
    } = useMagazineList();
    const { getColumns } = useGetColumns();
    const { data: totalCount, isLoading: totalCountLoading } = useGetTotalCount();
    const { downloadCSV, isLoading: isCsvLoading } = useDownloadCSV()

    const flattenedData = data?.pages.flatMap((page) => page.magazines) || [];

    return (
        <div className="w-full">
            <div className="flex items-center justify-between">
                <h3 className="flex gap-x-3 items-center scroll-m-20 text-2xl font-semibold tracking-tight">
                    Registered Articles {totalCountLoading ? <Skeleton className="h-[30px] w-[50px]" /> : `(${totalCount})`}
                </h3>
                <div className="flex items-center gap-x-3">
                    <Button onClick={() => downloadCSV("articles")} disabled={isCsvLoading} variant={"outline"}>
                        <Download />
                        Export to CSV
                    </Button>
                    <Link to={"/register/new"}>
                        <Button>
                            <Plus />
                            New
                        </Button>
                    </Link>
                </div>
            </div>
            <div className="mt-8" style={{ width: "calc(100vw - 18rem)" }}>
                <TooltipProvider>
                    {isLoading ? (
                        <Skeleton className="h-[125px] w-full mt-4" />
                    ) : (
                        <DataTable data={flattenedData} columns={getColumns} />
                    )}
                </TooltipProvider>
            </div>
        </div>
    );
};

export default Register;
