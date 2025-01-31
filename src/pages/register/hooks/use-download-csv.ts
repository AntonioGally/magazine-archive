import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { exportToCSV } from '@/lib/utils';
import { useState } from 'react';
import { Magazine } from '@/types';

const collectionName = 'magazine';

const useDownloadCSV = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchDocuments = async (): Promise<Magazine[]> => {
        const docRef = collection(db, collectionName);

        const q = query(docRef, orderBy('createdAt', 'desc'));

        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((doc) => ({
            _id: doc.id,
            ...doc.data() as Magazine,
        }));
    };


    const downloadCSV = async (filename: string) => {
        setIsLoading(true);
        try {
            const data = await fetchDocuments();
            if (data && data.length > 0) {
                exportToCSV(data, filename);
            } else {
                console.error('No data to export');
            }
        } catch (error) {
            console.error('Error exporting data to CSV', error);
        } finally {
            setIsLoading(false);
        }

    };

    return { downloadCSV, isLoading };
};

export default useDownloadCSV;
