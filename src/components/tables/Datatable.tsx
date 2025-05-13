import * as React from 'react';
// import { useNavigate } from "react-router-dom";
// import { formatCurrency } from "@/lib/currency";

// import Customer from "@/types/Customer";
// import Facility from "@/types/Facility";
// import { FunderGroup } from "@/types/Funder";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  // ArrowUpDown,
  ChevronDown,
  // ChevronRight,
  // Phone,
  // Mail,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
// import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  // DropdownMenuItem,
  // DropdownMenuLabel,
  // DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// import PageTitle from "@/components/page-title/PageTitle";

type DataTableProps = {
  apiResponse: {
    data: [];
    // pageNumber: number;
    // totalPages: number;
  };
  searchColumn: string;
  columns: [];
  hiddenColumns?: string[];
};

export function DataTable({ apiResponse, columns, searchColumn, hiddenColumns }: DataTableProps) {
  // const navigate = useNavigate();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  // get the common property

  const table = useReactTable({
    data: apiResponse.data,
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
  });

  React.useEffect(() => {
    if (hiddenColumns && hiddenColumns.length > 0) {
      table.getAllColumns().filter((column) => {
        if (hiddenColumns.includes(column.id)) {
          column.toggleVisibility(false);
        }
      });
    }
  }, [hiddenColumns]);

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        {/* <PageTitle size={40} className="mr-9" /> */}
        <Input
          placeholder={`Search ${searchColumn}...`}
          value={(table.getColumn(searchColumn)?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn(searchColumn)?.setFilterValue(event.target.value)}
          className="max-w-64 bg-border"
        />
        <div className="ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="bg-border">
              <Button variant="outline" className="ml-auto">
                Exchanges <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuCheckboxItem className="capitalize" checked={false} onCheckedChange={() => {}}>
                Future Exchanges
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem className="capitalize" checked={true} onCheckedChange={() => {}}>
                Past Exchanges
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="bg-border">
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide() && !hiddenColumns?.includes(column.id))
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => column.toggleVisibility(!!value)}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="">
        {/* https://stackoverflow.com/questions/71661210/tailwind-border-and-border-radius-rounded-issue-on-html-table-headers */}
        {/* https://codepen.io/clintongreen/pen/YzKgPrQ */}
        <Table className="border-1 border-dimmed border-separate border-spacing-0 rounded-sm border bg-background">
          <TableHeader className="">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="rounded-tl-sm rounded-tr-sm">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-cforeground border-b px-6 text-sm">
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-cforeground border-b px-6">
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
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getRowCount()} results.
          <span className="ml-2 text-xs italic">
            (Page {table.getState().pagination.pageIndex + 1} / {table.getPageCount()})
          </span>
        </div>
        <div className="space-x-2">
          <Button
            variant="brandnavy"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="brandnavy"
            className=""
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
