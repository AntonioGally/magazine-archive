import { InfiniteData, useInfiniteQuery, UseInfiniteQueryResult } from '@tanstack/react-query';
import { collection, query, orderBy, getDocs, startAfter, limit, QueryDocumentSnapshot } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { Magazine } from '@/types';

interface FetchMagazinesResult {
    magazines: Magazine[];
    lastVisible: QueryDocumentSnapshot | null;
}

const PAGE_SIZE = 20;

const useMagazineList = (): UseInfiniteQueryResult<InfiniteData<FetchMagazinesResult, unknown>, Error> => {
    const fetchMagazines = async ({ pageParam = null }: { pageParam?: QueryDocumentSnapshot | null }): Promise<FetchMagazinesResult> => {
        const docRef = collection(db, 'magazine');
        let q;

        if (pageParam) {
            q = query(docRef, orderBy('createdAt', 'desc'), startAfter(pageParam), limit(PAGE_SIZE));
        } else {
            q = query(docRef, orderBy('createdAt', 'desc'), limit(PAGE_SIZE));
        }

        const querySnapshot = await getDocs(q);
        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1] || null;

        return {
            magazines: querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...(doc.data() as Omit<Magazine, 'id'>),
                createdAt: doc.data().createdAt?.toDate().toISOString(),
            })),
            lastVisible,
        };
    };

    return useInfiniteQuery({
        queryKey: ['magazines'],
        initialPageParam: undefined,
        queryFn: fetchMagazines,
        getNextPageParam: (lastPage) => lastPage.lastVisible || undefined,
        staleTime: 1000 * 60 * 5,
    });
};

export default useMagazineList;
