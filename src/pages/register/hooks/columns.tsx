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
import { ColumnDef, SortingFn } from "@tanstack/react-table"
import { Magazine } from "@/types"
// Scripts
import { queryClient } from "@/main"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";


const useGetColumns = () => {
    const navigate = useNavigate();

    async function deleteMagazine(id: string) {
        const docRef = doc(db, "magazine", id)
        await deleteDoc(docRef);
        queryClient.invalidateQueries({ queryKey: ["magazines"] });
    }

    function formatSource(value: string) {
        return value.length > 80 ? `${value.slice(0, 80)}...` : value
    }

    function formatTitle(value: string) {
        return value.trim().toLowerCase().replace(/[^\w\s]/gi, "")
    }

    const sortTitleFn: SortingFn<Magazine> = (rowA, rowB): number => {
        const titleA = formatTitle(rowA.original.title)
        const titleB = formatTitle(rowB.original.title)

        if (titleA < titleB) return -1
        else if (titleA > titleB) return 1
        return 0;
    }

    const sortPublicationYearFn: SortingFn<Magazine> = (rowA, rowB): number => {
        const yearA = Number(rowA.original.publication_year) || 0
        const yearB = Number(rowB.original.publication_year) || 0

        if (yearA < yearB) return -1
        else if (yearA > yearB) return 1
        return 0;
    }

    const getColumns: ColumnDef<Magazine>[] = useMemo(() => {
        return [
            {
                accessorKey: "title",
                header: ({ column }) => (
                    <DataTableColumnHeader column={column} title="Title" />
                ),
                sortingFn: sortTitleFn,
                cell: ({ row }) => {
                    return (
                        <div className="min-w-[300px] max-w-[600px] ">
                            <span className="text-slate-900 font-semibold">
                                {row.original.title}
                            </span>
                            <span className="text-slate-500 flex items-center gap-x-1">
                                <Eye size={16} /> {row.original.views}
                            </span>
                        </div>
                    )
                }
            },
            {
                accessorKey: "author",
                header: ({ column }) => (
                    <DataTableColumnHeader column={column} title="Author" />
                ),
                cell: ({ row }) => {
                    const authors = row.original.author;
                    return (
                        <div className="w-[200px] flex flex-wrap gap-1">
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
                accessorKey: "source",
                header: ({ column }) => (
                    <DataTableColumnHeader column={column} title="References" />
                ),
                cell: ({ row }) => {
                    return (
                        <div className="w-[300px] break-words">
                            <Tooltip>
                                <TooltipTrigger className="text-left">
                                    {formatSource(row.original.source)}
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className="w-[300px] break-words">
                                        {row.original.source}
                                    </p>
                                </TooltipContent>
                            </Tooltip>
                        </div>
                    )
                }
            },
            {
                accessorKey: "periodical_title",
                header: ({ column }) => (
                    <DataTableColumnHeader column={column} title="Periodical Title" />
                ),
                cell: ({ row }) => (
                    <div className="min-w-[150px]">
                        {row.original.periodical_title}
                    </div>
                )
            },
            {
                accessorKey: "publication_year",
                header: ({ column }) => (
                    <DataTableColumnHeader column={column} title="Publication year" />
                ),
                sortingFn: sortPublicationYearFn,
                cell: ({ row }) => (
                    <div className="min-w-[100px]">
                        {row.original.publication_year}
                    </div>
                )
            },
            {
                accessorKey: "textual_genre",
                header: ({ column }) => (
                    <DataTableColumnHeader column={column} title="Textual genre" />
                ),
                cell: ({ row }) => (
                    <div className="min-w-[100px]">
                        {row.original.textual_genre}
                    </div>
                )
            },
            {
                accessorKey: "createdAt",
                header: "Created at",
                cell: ({ row }) => (
                    <div className="w-[80px]">
                        {new Date(row.original.createdAt).toLocaleDateString("pt-BR")}
                    </div>
                ),
            },
            {
                accessorKey: "createdBy",
                header: ({ column }) => (
                    <DataTableColumnHeader column={column} title="Created by" />
                ),
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