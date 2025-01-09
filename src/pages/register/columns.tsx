// Components
import { MoreHorizontal } from "lucide-react"
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
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { queryClient } from "@/main"

async function deleteMagazine(id: string) {
    const docRef = doc(db, "magazine", id)
    await deleteDoc(docRef);
    queryClient.invalidateQueries({ queryKey: ["magazines"] });
}

export const columns: ColumnDef<Magazine>[] = [
    {
        accessorKey: "title",
        header: "Título",
    },
    {
        accessorKey: "author",
        header: "Autor",
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
        accessorKey: "views",
        header: "Visualizações",
    },
    {
        accessorKey: "createdAt",
        header: "Criação",
        cell: ({ row }) => new Date(row.original.createdAt).toLocaleString("pt-BR"),
    },
    {
        accessorKey: "createdBy",
        header: "Criado por"
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const magazine = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Abrir menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(magazine.id)}
                        >
                            Copiar ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => deleteMagazine(magazine.id)}>Deletar registro</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
