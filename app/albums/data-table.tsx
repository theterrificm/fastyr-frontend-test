"use client"
import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { VisibilityState } from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useMutation, gql } from '@apollo/client'
import { useToast } from "@/hooks/use-toast"




const DELETE_USER_MUTATION = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`

interface DataTableProps<TData extends { id: string | number }, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  // State for sorting, filtering, column visibility, and row selection
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [loading, setLoading] = React.useState(false) // State to handle loading state for delete button
 
  // Setting up the table with react-table hooks
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })
  const { toast } = useToast()

  const [deleteUser] = useMutation(DELETE_USER_MUTATION)

  // Function to handle bulk delete of selected rows
  const handleBulkDelete = async () => {
    const selectedRows = table.getFilteredSelectedRowModel().rows
    if (selectedRows.length === 0) return

    setLoading(true) // Set loading to true before starting the delete process
    try {
      await Promise.all(
        selectedRows.map((row) =>
          deleteUser({ variables: { id: row.original.id } })
        )
      )
      // Optionally, refetch data or update the state after deletion
      toast({
        title: "Successful.",
        description: `${table.getFilteredSelectedRowModel().rows.length} users deleted successfully.`,
      })

      console.log('Users deleted successfully')
    } catch (error) {
      console.error('Error deleting users:', error)
    } finally {
      setLoading(false) // Set loading to false after the delete process is complete
    }
  }

  return (
    <div>
      {/* Filter input for filtering table rows */}
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter titles..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        {/* Delete button with loading state */}
        <Button
          variant="destructive"
          className="ml-5"
          disabled={loading || table.getFilteredSelectedRowModel().rows.length === 0}
          onClick={handleBulkDelete} 
        >
          {loading ? "Deleting..." : "Delete"}
        </Button>
      </div>
      {/* Table component to display data */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                > 
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* Displaying the count of selected rows */}
      <div className="flex-1 text-sm text-muted-foreground">
        {console.log(table.getFilteredSelectedRowModel().rows)}
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
    </div>
  )
}
