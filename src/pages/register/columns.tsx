// Libs
import { useMemo } from "react"
import { useNavigate } from "react-router"
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
// Components
import { Eye, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
// Types
import { ColumnDef } from "@tanstack/react-table"
import { Magazine } from "@/types"
// Scripts
import { queryClient } from "@/main"


const useGetColumns = () => {
    const navigate = useNavigate();

    async function deleteMagazine(id: string) {
        const docRef = doc(db, "magazine", id)
        await deleteDoc(docRef);
        queryClient.invalidateQueries({ queryKey: ["magazines"] });
    }

    const getColumns: ColumnDef<Magazine>[] = useMemo(() => {
        return [
            {
                accessorKey: "title",
                header: "Title",
                cell: ({ row }) => {

                    return (
                        <div className="max-w-[600px] ">
                            <span className="text-slate-900 font-semibold">{row.original.title}</span>
                            <div className="flex items-center gap-x-2">
                                <span className="text-slate-500 block">{row.original.textual_genre}</span>
                                <span className="text-slate-500 flex items-center gap-x-1">
                                    <Eye size={16} /> {row.original.views}
                                </span>
                            </div>
                        </div>
                    )
                }
            },
            {
                accessorKey: "author",
                header: "Author",
                cell: ({ row }) => {
                    const authors = row.original.author;
                    return (
                        <div className="flex flex-wrap gap-1">
                            {authors.map((author, index) => (
                                <span className="p-1 rounded bg-slate-100 w-fit" key={index}>
                                    {author}
                                </span>
                            ))}
                        </div>
                    )
                },
            },
            {
                accessorKey: "createdAt",
                header: "Created at",
                cell: ({ row }) => (
                    <div className="min-w-[180px]">
                        {new Date(row.original.createdAt).toLocaleString("pt-BR")}
                    </div>
                ),
            },
            {
                accessorKey: "createdBy",
                header: "Created by"
            },
            {
                id: "actions",
                cell: ({ row }) => {
                    const magazine = row.original

                    return (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open Menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                    onClick={() => navigator.clipboard.writeText(magazine.id)}
                                >
                                    Copy ID
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => navigate(`/register/${magazine.id}`)}>Edit</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => deleteMagazine(magazine.id)}>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )
                },
            },
        ]
    }, [navigate])

    return { getColumns }
}

export default useGetColumns