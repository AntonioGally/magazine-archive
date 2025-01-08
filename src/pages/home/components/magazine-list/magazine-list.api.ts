import { query, collection, getDocs } from "firebase/firestore"
import { db } from "@/config/firebase"
import { useQuery } from "@tanstack/react-query";
import { Magazine } from "../../../../types";

const useMagazineList = () => {
    async function fetchMagazines() {
        const q = query(collection(db, "magazine"));
        const querySnapshot = await getDocs(q);

        return querySnapshot.docs.
            map((doc) => ({
                id: doc.id,
                ...(doc.data() as Omit<Magazine, "id">),
                createdAt: doc.data().createdAt?.toDate().toLocaleString('pt-br'),
            }));
    }

    return useQuery({
        queryKey: ['magazines'],
        queryFn: fetchMagazines,
        staleTime: 1000 * 60 * 5,
    });
}

export default useMagazineList;