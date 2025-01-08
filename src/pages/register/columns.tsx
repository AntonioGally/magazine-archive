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
    },
    {
        accessorKey: "createdAt",
        header: "Criação",
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
