/* eslint-disable @typescript-eslint/no-explicit-any */

import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { exportToCSV } from '@/lib/utils';
import { useState } from 'react';

interface Document {
    id: string; // Firestore document ID
    [key: string]: any; // Other fields in the document
}

const collectionName = 'magazine';

const useDownloadCSV = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchDocuments = async (): Promise<Document[]> => {
        const docRef = collection(db, collectionName);
        const querySnapshot = await getDocs(docRef);

        return querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
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
