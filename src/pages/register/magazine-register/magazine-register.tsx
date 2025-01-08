// Libs
import { useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { addDoc, collection, getDocs, query, serverTimestamp, where } from "firebase/firestore"
import { db } from "@/config/firebase"
import { Link } from "react-router"
import { useSelector } from "react-redux"
// Components
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
// Assets
import { ArrowLeft } from "lucide-react"
// Types
import { Magazine } from "@/types"
import { RootState } from "@/store"
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
    title: z.string(),
    source: z.string(),
    abstract: z.string(),
    author: z.string(),
    archive_link: z.string().optional(),
    pdf_link: z.string(),
})

const MagazineRegister = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })
    const [loading, setLoading] = useState(false);
    const userEmail = useSelector((state: RootState) => state.authentication.email)

    const { toast } = useToast()

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const raw_title = values.title.toLowerCase().replace(/ /g, "-");
        const createdAt = serverTimestamp();
        const author = values.author.split(";").map((author) => author.trim());
        const createdBy = userEmail || "admin";

        const payload: Omit<Magazine, "id"> = {
            ...values,
            author,
            raw_title,
            createdAt,
            archive_link: values.archive_link || "",
            createdBy
        }

        const q = query(
            collection(db, "magazine"),
            where("raw_title", "==", raw_title)
        );

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            form.setError("title", {
                type: "manual",
                message: "Título já cadastrado"
            });
            return;
        }

        setLoading(true);
        addDoc(collection(db, "magazine"), payload)
            .then((data) => {
                toast({
                    title: "Registro salvo!",
                    description: `Revista ${payload.title} cadastrada com sucesso`,
                })
                console.log("Document written with ID: ", data.id);
                form.reset({ title: "", source: "", abstract: "", author: "", archive_link: "", pdf_link: "" });
                setTimeout(() => form.setFocus("title"), 0)
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }

    return (
        <div className="w-full">
            <div className="flex items-center space-x-4">
                <Link to={"/register"}>
                    <Button variant={"outline"}><ArrowLeft /> Voltar</Button>
                </Link>
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                    Cadastro de revista
                </h3>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-4 max-w-[400px]">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Título:</FormLabel>
                                <FormControl>
                                    <Input autoFocus type="text" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="source"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Fonte:</FormLabel>
                                <FormControl>
                                    <Input type="text" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="abstract"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Resumo:</FormLabel>
                                <FormControl>
                                    <Textarea {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="author"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Autor:</FormLabel>
                                <FormControl>
                                    <Input placeholder="Autor n1; Autor n2; ..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="pdf_link"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Link PDF:</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="archive_link"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Link da revista (opt):</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={loading}>Salvar</Button>
                </form>
            </Form>
        </div>
    )
}

export default MagazineRegister;