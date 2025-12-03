import { ColumnDef, Row } from "@tanstack/react-table";

/**
 * Export table data to CSV format
 * @param rows - The rows to export (usually from table.getFilteredRowModel().rows)
 * @param columns - The column definitions
 * @param filename - The name of the downloaded file
 */
export function exportToCSV<TData>(rows: Row<TData>[], columns: ColumnDef<TData, any>[], filename: string) {
  // Extract headers, excluding select and actions columns
  const headers = columns
    .filter((col) => col.id !== "select" && col.id !== "actions")
    .map((col) => (col.id || (col as any).accessorKey) as string);

  // Build CSV content
  const csvContent = [
    headers.join(","),
    ...rows.map((row) =>
      headers
        .map((header) => {
          const value = row.getValue(header);
          // Handle values with commas by wrapping in quotes
          if (typeof value === "string") {
            return value.includes(",") || value.includes('"') ? `"${value.replace(/"/g, '""')}"` : value;
          }
          return value;
        })
        .join(",")
    ),
  ].join("\n");

  // Create and trigger download
  const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" }); // BOM for Excel
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
