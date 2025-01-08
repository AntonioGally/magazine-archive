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
        // cell: ({ row }) => {
        //     const createdAt = row.getValue("createdAt") as any;
        //     console.log(createdAt);

        //     return <div className="text-right font-medium">{createdAt}</div>
        // },
    },
]
