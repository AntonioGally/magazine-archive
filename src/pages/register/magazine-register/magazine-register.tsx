// Libs
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
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
import { Magazine } from "@/types"
import { db } from "@/config/firebase"

const formSchema = z.object({
    title: z.string(),
    source: z.string(),
    abstract: z.string(),
    author: z.string(),
    archive_link: z.string().optional(),
    pdf_link: z.string(),
})

const MagazineRegister = () => {
    const [loading, setLoading] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const raw_title = values.title.toLowerCase().replace(/ /g, "-");
        const createdAt = serverTimestamp();
        const author = values.author.split(";").map((author) => author.trim());

        const payload: Omit<Magazine, "id"> = {
            ...values,
            author,
            raw_title,
            createdAt,
            archive_link: values.archive_link || "",
        }

        setLoading(true);
        addDoc(collection(db, "magazine"), payload)
            .then((data) => {
                console.log("Document written with ID: ", data.id);
                form.reset({ title: "", source: "", abstract: "", author: "", archive_link: "", pdf_link: "" });
                setTimeout(() => form.setFocus("title"), 0)
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }

    return (
        <div className="w-full">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-4 max-w-[400px]">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Título:</FormLabel>
                                <FormControl>
                                    <Input type="text" {...field} value={field.value} />
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