"use client"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
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
  // {
  //   accessorKey: "id",
  //   header: "Id",
  // },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  
]

//for the bulk delete logic: on every checkbox click, we will push the ids and then delete altogether 