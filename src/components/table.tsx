"use client";

import React, { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "@/styles/table.module.scss";

export interface DynamicColumn {
  key: string;
  header: string;
}

export type RowData = Record<string, React.ReactNode>;

export interface DynamicTableProps {
  columns: DynamicColumn[];
  rows: RowData[];
  itemsPerPage?: number;
  className?: string;
}

export default function DynamicTable({ columns, rows, itemsPerPage = 10, className }: DynamicTableProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(rows.length / itemsPerPage);

  const paginatedRows = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return rows.slice(startIndex, endIndex);
  }, [rows, currentPage, itemsPerPage]);

  function handlePreviousPage() {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }

  function handleNextPage() {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  }

  if (!columns || columns.length === 0) {
    return <div className={styles.message}>Definicion de columnas requerida.</div>;
  }

  if (!rows || rows.length === 0) {
    return <div className={styles.message}>No hay datos que mostrar.</div>;
  }

  return (
    <>
      <div className={`${styles.tableContainer} ${className || ""}`}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.headerRow}>
              {columns.map((col) => (
                <th key={col.key} className={styles.tableHeaderCell}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedRows.map((row) => (
              <tr key={`${row.id}`} className={styles.tableRow}>
                {columns.map((col) => (
                  <td key={`${col.key}-${row.id}`} className={styles.tableCell}>
                    {row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className={styles.paginationControls}>
          <button onClick={handlePreviousPage} disabled={currentPage === 1} className={styles.paginationButton} aria-label="Previous page">
            <ChevronLeft size={18} />
          </button>
          <span className={styles.paginationInfo}>
            Pagina {currentPage} de {totalPages}
          </span>
          <button onClick={handleNextPage} disabled={currentPage === totalPages} className={styles.paginationButton} aria-label="Next page">
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </>
  );
}
