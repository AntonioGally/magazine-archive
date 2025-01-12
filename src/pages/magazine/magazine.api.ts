import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { Magazine } from "../../types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "@/main";

export const useGetMagazine = (id: string | undefined) => {
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

export const useViewMagazine = (id: string | undefined) => {

    const fetchMagazine = async (currentViewCount: number) => {
        if (!id) return null;

        const docRef = doc(db, "magazine", id);
        await updateDoc(docRef, {
            views: currentViewCount + 1
        })
    }

    return useMutation({
        mutationKey: ['update-magazine-view', id],
        mutationFn: fetchMagazine,
        onMutate: async () => {
            queryClient.setQueryData(['magazine', id], (old: Magazine) => {
                return {
                    ...old,
                    views: old.views + 1
                }
            })

            queryClient.setQueryData(['magazines'], (old: Magazine[]) => {
                return old.map(magazine => {
                    if (magazine.id === id) {
                        return {
                            ...magazine,
                            views: magazine.views + 1
                        }
                    }
                    return magazine
                })
            })
        }
    })
}