import { ColumnDef } from "@tanstack/react-table"
import { Magazine } from "@/types"

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
    }
]
