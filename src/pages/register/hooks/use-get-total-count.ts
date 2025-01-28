import { db } from "@/config/firebase";
import { useQuery } from "@tanstack/react-query";
import { collection, getCountFromServer } from "firebase/firestore";

const useGetTotalCount = () => {
    const fetchTotalCount = async (): Promise<number> => {
        const docRef = collection(db, "magazine");
        const snapshot = await getCountFromServer(docRef);
        return snapshot.data().count;
    };

    return useQuery({
        queryKey: ["magazine-count"],
        queryFn: fetchTotalCount,
    })
}

export default useGetTotalCount;