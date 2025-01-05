import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { query, collection, where, getDocs } from "firebase/firestore"
import { db } from "@/config/firebase"
import { useQuery } from "@tanstack/react-query";
import { Magazine } from "../../types";

const useMagazineList = () => {
    const { title, author, abstract } = useSelector((state: RootState) => state.filter.filters)

    async function fetchMagazines() {
        const conditions = [];

        if (title) {
            conditions.push(where('title', '>=', title));
            conditions.push(where('title', '<=', title + '\uf8ff'));
        }

        if (abstract) {
            conditions.push(where('abstract', '>=', abstract));
            conditions.push(where('abstract', '<=', abstract + '\uf8ff'));
        }

        if (author) {
            conditions.push(where("author", "array-contains-any", [author]));
        }
        const q = query(
            collection(db, "magazine"),
            ...conditions
        );

        const querySnapshot = await getDocs(q);

        return querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...(doc.data() as Omit<Magazine, "id">),
        }));
    }

    return useQuery({
        queryKey: ['magazines', title, author, abstract],
        queryFn: fetchMagazines,
        staleTime: 1000 * 60 * 5,
    });
}

export default useMagazineList;