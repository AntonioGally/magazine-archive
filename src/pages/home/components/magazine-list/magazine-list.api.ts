import { collection, getDocs } from "firebase/firestore"
import { db } from "@/config/firebase"
import { useQuery } from "@tanstack/react-query";
import { Magazine } from "../../../../types";

const useMagazineList = () => {
    async function fetchMagazines() {
        const querySnapshot = await getDocs(collection(db, "magazine"));

        return querySnapshot.docs.
            map((doc) => ({
                id: doc.id,
                ...(doc.data() as Omit<Magazine, "id">),
                createdAt: doc.data().createdAt?.toDate().toISOString(),
            }));
    }

    return useQuery({
        queryKey: ['magazines'],
        queryFn: fetchMagazines,
        staleTime: 1000 * 60 * 5,
    });
}

export default useMagazineList;