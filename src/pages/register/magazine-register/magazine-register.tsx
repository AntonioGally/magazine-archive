/* eslint-disable @typescript-eslint/no-explicit-any */
// Libs
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Link, useParams } from "react-router"
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
import useMutateMagazine from "./hooks/use-mutate-magazine"
import { useEffect } from "react"
import { useGetMagazine } from "@/pages/magazine/magazine.api"
import { Skeleton } from "@/components/ui/skeleton"

export const formSchema = z.object({
    title: z.string(),
    author: z.string(),
    textual_genre: z.string(),
    source: z.string(),
    pdf_link: z.string(),
    abstract: z.string(),
    periodical_title: z.string().optional(),
    publication_year: z.string().optional(),
})

const MagazineRegister = () => {
    const { magazineId } = useParams<{ magazineId: string }>();
    const { data, isLoading: fetchLoading } = useGetMagazine(magazineId);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        }
    });

    const { createMagazine, updateMagazine, loading } = useMutateMagazine(form as any);

    useEffect(() => {
        if (!magazineId || !data) return;

        form.reset({
            title: data.title,
            author: data.author.join("; "),
            textual_genre: data.textual_genre,
            source: data.source,
            pdf_link: data.pdf_link,
            abstract: data.abstract,
            periodical_title: data.periodical_title,
            publication_year: data.publication_year ? String(data.publication_year) : undefined
        });
    }, [magazineId, data, form]);

    return (
        <div className="w-full">
            <div className="flex items-center space-x-4">
                <Link to={"/register"}>
                    <Button variant={"outline"}><ArrowLeft /> Go Back</Button>
                </Link>
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                    Magazine Register
                </h3>
            </div>
            {fetchLoading ? (
                <Skeleton className="h-[125px] w-full mt-4" />
            ) : (
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit((values) => magazineId ? updateMagazine(values, data || null) : createMagazine(values))}
                        className="mt-8"
                    >
                        <div className="flex space-x-8 items-start">
                            <div className="space-y-4 min-w-[400px]">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Title:</FormLabel>
                                            <FormControl>
                                                <Textarea autoFocus rows={3} {...field} />
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
                                            <FormLabel>Author:</FormLabel>
                                            <FormControl>
                                                <Textarea rows={3} placeholder="Autor n1; Autor n2; ..." {...field} />
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
                                            <FormLabel>Abstract:</FormLabel>
                                            <FormControl>
                                                <Textarea rows={9} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="space-y-4 min-w-[400px]">
                                <FormField
                                    control={form.control}
                                    name="pdf_link"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>PDF Link:</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
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
                                            <FormLabel>References:</FormLabel>
                                            <FormControl>
                                                <Textarea rows={5} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="periodical_title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Periodical Title:</FormLabel>
                                            <FormControl>
                                                <Input type="text" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="publication_year"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Publication Year:</FormLabel>
                                            <FormControl>
                                                <Input type="text" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="textual_genre"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Textual Genre:</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <Button className="mt-8" type="submit" disabled={loading}>
                            {magazineId ? "Edit" : "Save"}
                        </Button>
                    </form>
                </Form>
            )}
        </div>
    )
}

export default MagazineRegister;