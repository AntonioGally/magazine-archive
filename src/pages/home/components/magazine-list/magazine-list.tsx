import { Skeleton } from "@/components/ui/skeleton";
import useMagazineList from "./magazine-list.api";
import MagazineItem from "../magazine-item/magazine-item";

const MagazineList = () => {
    const { data, isLoading } = useMagazineList();

    if (isLoading) return new Array(3).fill(0).map((_, i) => (
        <Skeleton key={i} className="h-[125px] w-full md:w-[730px] mt-4" />
    ));

    return (
        <div className="mt-4">
            <div className="max-w-[730px]">
                {data && data.map(magazine => (
                    <MagazineItem {...magazine} key={magazine.id} />
                ))}
            </div>
        </div>
    )
}

export default MagazineList;