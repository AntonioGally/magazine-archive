import { Skeleton } from "@/components/ui/skeleton";
import useMagazineList from "./magazine-list.api";
import MagazineItem from "../magazine-item/magazine-item";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const MagazineList = () => {
    const { data, isLoading } = useMagazineList();
    const { title, author, abstract } = useSelector((state: RootState) => state.filter.filters)

    if (isLoading) return new Array(3).fill(0).map((_, i) => (
        <Skeleton key={i} className="h-[125px] w-full md:w-[730px] mt-4" />
    ));

    return (
        <div className="mt-8">
            <div className="max-w-[730px]">
                {data && data
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .filter((magazine) =>
                        (title ? magazine.title.toLowerCase().includes(title) : true) &&
                        (author ? magazine.author.find((_author) => _author.toLowerCase().indexOf(author.toLowerCase()) > -1) : true) &&
                        (abstract ? magazine.abstract.toLowerCase().includes(abstract) : true)
                    )
                    .map(magazine => (
                        <MagazineItem {...magazine} key={magazine.id} />
                    ))}
            </div>
        </div>
    )
}

export default MagazineList;