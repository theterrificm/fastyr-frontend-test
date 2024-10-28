"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type AlbumsColumns = {
  id: number,
  title: string,
}

export const columns: ColumnDef<AlbumsColumns>[] = [
  {
    accessorKey: "bulk",
    header: () => <Checkbox/>,
    cell: ({row}) => <Checkbox id={row.original.id}/>,
  },
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  
]
