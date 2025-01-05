import { doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { Magazine } from "../home/types";
import { useQuery } from "@tanstack/react-query";

const useGetMagazine = (id: string | undefined) => {

    const fetchMagazine = async () => {
        if (!id) return null;

        const docRef = doc(db, "magazine", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return {
                id: docSnap.id,
                ...docSnap.data() as Omit<Magazine, "id">
            }
        } else {
            return null;
        }
    }

    return useQuery({
        queryKey: ['magazine', id],
        queryFn: fetchMagazine,
        staleTime: 1000 * 60 * 5,
        enabled: !!id
    })

}

export default useGetMagazine;