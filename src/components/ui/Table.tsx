"use client";

import { ReactNode } from "react";

export interface TableColumn<T> {
  key: string;
  header: ReactNode;
  render: (row: T) => ReactNode;
  className?: string;
}

interface TableProps<T> {
  columns: TableColumn<T>[];
  rows: T[];
  getRowKey: (row: T) => string | number;
  onRowClick?: (row: T) => void;
  emptyMessage?: string;
}

export function Table<T>({
  columns,
  rows,
  getRowKey,
  onRowClick,
  emptyMessage = "No records found.",
}: TableProps<T>) {
  if (rows.length === 0) {
    return (
      <div className="flex min-h-[160px] items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white text-sm text-slate-500">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-card">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className={`px-4 py-3 font-semibold ${col.className ?? ""}`}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map((row) => (
            <tr
              key={getRowKey(row)}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              className={
                onRowClick
                  ? "cursor-pointer transition hover:bg-primary-50/60"
                  : ""
              }
            >
              {columns.map((col) => (
                <td key={col.key} className={`px-4 py-3 text-slate-700 ${col.className ?? ""}`}>
                  {col.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
