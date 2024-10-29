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

// Define User interface with an id property
interface User {
  id: string | number
  name: string
  email: string
}

// Define props with the User type
interface DataTableProps<TValue> {
  columns: ColumnDef<User, TValue>[]
  data: User[]
}

export function DataTable<TValue>({
  columns,
  data,
}: DataTableProps<TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [loading, setLoading] = React.useState(false)

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

  const handleBulkDelete = async () => {
    const selectedRows = table.getFilteredSelectedRowModel().rows
    if (selectedRows.length === 0) return

    setLoading(true)
    try {
      await Promise.all(
        selectedRows.map((row) =>
          deleteUser({ variables: { id: row.original.id } })
        )
      )
      toast({
        title: "Successful.",
        description: `${table.getFilteredSelectedRowModel().rows.length} users deleted successfully.`,
      })

      console.log('Users deleted successfully')
    } catch (error) {
      console.error('Error deleting users:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter names..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Button
          variant="destructive"
          className="ml-5"
          disabled={loading || table.getFilteredSelectedRowModel().rows.length === 0}
          onClick={handleBulkDelete} 
        >
          {loading ? "Deleting..." : "Delete"}
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
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
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
    </div>
  )
}
