import { Skeleton } from "@/components/ui/skeleton";
import useMagazineList from "./magazine-list.api";
import MagazineItem from "../magazine-item/magazine-item";
import { Button } from "@/components/ui/button";

const MagazineList = () => {
    const {
        data,
        isLoading,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
    } = useMagazineList();

    const flattenedData = data?.pages.flatMap((page) => page.magazines) || [];

    if (isLoading)
        return new Array(3).fill(0).map((_, i) => (
            <Skeleton key={i} className="h-[125px] w-full md:w-[730px] mt-4" />
        ));

    return (
        <div className="mt-8">
            <div className="max-w-[730px]">
                {flattenedData.map((magazine) => (
                    <MagazineItem {...magazine} key={magazine.id} />
                ))}
                {hasNextPage && (
                    <div className="flex justify-center mt-4">
                        <Button
                            onClick={() => fetchNextPage()}
                            disabled={isFetchingNextPage}
                        >
                            {isFetchingNextPage ? "Loading..." : "Load More"}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MagazineList;
