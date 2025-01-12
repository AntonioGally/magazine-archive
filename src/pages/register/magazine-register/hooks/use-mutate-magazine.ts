import { z } from "zod"
import { formSchema } from "../magazine-register"
import { addDoc, collection, doc, FieldValue, getDocs, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Magazine } from "@/types";
import { UseFormReturn } from "react-hook-form";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { db } from "@/config/firebase";

interface Payload extends Omit<Magazine, "id" | "createdAt"> {
    createdAt: FieldValue
}

const useMutateMagazine = (form: UseFormReturn) => {
    const [loading, setLoading] = useState(false);
    const userEmail = useSelector((state: RootState) => state.authentication.email);

    const { toast } = useToast();

    async function magazineExists(rawTitle: string) {
        const q = query(
            collection(db, "magazine"),
            where("raw_title", "==", rawTitle)
        );

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            form.setError("title", {
                type: "manual",
                message: "Título já cadastrado"
            });
            return true;
        }

        return false;
    }

    const createMagazine = async (values: z.infer<typeof formSchema>) => {
        const raw_title = values.title.toLowerCase().replace(/ /g, "-");
        const createdAt = serverTimestamp();
        const author = values.author.split(";").map((author) => author.trim());
        const createdBy = userEmail || "admin";

        const payload: Payload = {
            ...values,
            views: 0,
            author,
            raw_title,
            createdAt,
            createdBy,
            publication_year: values.publication_year ? Number(values.publication_year) : undefined,
        }

        const isMagazineExistent = await magazineExists(raw_title);
        if (isMagazineExistent) return;

        setLoading(true);
        addDoc(collection(db, "magazine"), payload)
            .then((data) => {
                toast({
                    title: "Registro salvo!",
                    description: `Revista ${payload.title} cadastrada com sucesso`,
                })
                console.log("Document written with ID: ", data.id);
                form.reset({
                    title: "",
                    author: "",
                    textual_genre: "",
                    source: "",
                    pdf_link: "",
                    abstract: "",
                    periodical_title: "",
                    publication_year: "",
                });
                setTimeout(() => form.setFocus("title"), 0)
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }

    const updateMagazine = async (values: z.infer<typeof formSchema>, originalData: Magazine | null) => {
        if (!originalData) return;

        const raw_title = values.title.toLowerCase().replace(/ /g, "-");
        const author = values.author.split(";").map((author) => author.trim());

        const payload = {
            ...values,
            author,
            raw_title,
            publication_year: values.publication_year ? Number(values.publication_year) : undefined,
        }

        const isMagazineExistent = originalData?.raw_title !== raw_title && await magazineExists(raw_title);
        if (isMagazineExistent) return;

        setLoading(true);
        const docRef = doc(db, "magazine", originalData.id);
        updateDoc(docRef, payload)
            .then(() => {
                toast({
                    title: "Registro salvo!",
                    description: `Revista ${payload.title} atualizada com sucesso`,
                })
                console.log("Document written with ID: ", originalData.id);
                setTimeout(() => form.setFocus("title"), 0)
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }

    return {
        createMagazine,
        updateMagazine,
        loading
    }
}

export default useMutateMagazine