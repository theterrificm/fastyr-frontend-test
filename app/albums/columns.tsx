"use client"
import { useState } from "react"
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
    //as soon as the select all states becomes true, all the checkbox will become true as well
    accessorKey: "select",
    header: () => <Checkbox name="bulk" value={"bulkDelete"} />,
    cell: ({row}) => <Checkbox value={row.original.id} />,
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

//for the bulk delete logic: on every checkbox click, we will push the ids and then delete altogether 