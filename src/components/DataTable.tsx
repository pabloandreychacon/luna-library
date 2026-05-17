import React, { useState, useMemo, useRef, useEffect } from 'react';

import { dataTableStyles } from '../styles';
import Button from './Button';
import Input from './Input';

export type DataTableColumn = {
  key: string;
  label: React.ReactNode;
  sortable?: boolean;
  filterable?: boolean;
  filterOptions?: { label: string; value: any }[];
  render?: (value: any, row: any) => React.ReactNode;
};

export type DataTableTexts = {
  showing?: string;
  results?: string;
  prev?: string;
  next?: string;
  noData?: string;
  filterPlaceholder?: string;
};

export type DataTableClassNames = {
  container?: string;
  table?: string;
  thead?: string;
  tbody?: string;
  tr?: string;
  th?: string;
  td?: string;
  pagination?: string;
  searchContainer?: string;
};

export type DataTableStyles = {
  container?: React.CSSProperties;
  searchContainer?: React.CSSProperties;
  table?: React.CSSProperties;
  thead?: React.CSSProperties;
  tbody?: React.CSSProperties;
  th?: React.CSSProperties;
  td?: React.CSSProperties;
  tr?: React.CSSProperties;
  pagination?: React.CSSProperties;
  icon?: React.CSSProperties;
  filterMenu?: React.CSSProperties;
  filterOption?: React.CSSProperties;
};

export type DataTableProps = {
  columns: DataTableColumn[];
  data: any[];
  pagination?: boolean;
  pageSize?: number;
  selectable?: boolean;
  onSelectionChange?: (selectedRows: any[]) => void;
  onRowClick?: (row: any) => void;
  onRowDoubleClick?: (row: any) => void;
  searchable?: boolean;
  texts?: DataTableTexts;
  classNames?: DataTableClassNames;
  styles?: DataTableStyles;
  className?: string;
};

const DataTable = ({
  columns,
  data,
  pagination = false,
  pageSize = 10,
  selectable = false,
  onSelectionChange,
  onRowClick,
  onRowDoubleClick,
  searchable = false,
  texts = {},
  classNames,
  styles,
  className,
}: DataTableProps) => {
  const defaultClassNames = {
    container: 'luna-datatable',
    table: 'luna-datatable-table',
    thead: 'luna-datatable-thead',
    tbody: 'luna-datatable-tbody',
    tr: 'luna-datatable-tr',
    th: 'luna-datatable-th',
    td: 'luna-datatable-td',
    pagination: 'luna-datatable-pagination',
    searchContainer: 'luna-datatable-search'
  };
  const finalClassNames = { ...defaultClassNames, classNames };

  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<any>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [columnFilters, setColumnFilters] = useState<{ [key: string]: any }>({});
  const [activeFilterMenu, setActiveFilterMenu] = useState<string | null>(null);
  const filterMenuRef = useRef<HTMLDivElement>(null);

  const t = {
    showing: '',
    results: '',
    prev: '←',
    next: '→',
    noData: 'No results found',
    filterPlaceholder: 'Filter...',
    ...texts,
  };

  // Close filter menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterMenuRef.current && !filterMenuRef.current.contains(event.target as Node)) {
        setActiveFilterMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // --- Filtering ---
  const filteredData = useMemo(() => {
    let result = [...data];
    if (searchTerm) {
      result = result.filter(row =>
        Object.values(row).some(val =>
          String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
    Object.keys(columnFilters).forEach(key => {
      const filterValue = columnFilters[key];
      if (filterValue !== undefined && filterValue !== '') {
        result = result.filter(row => String(row[key]) === String(filterValue));
      }
    });
    return result;
  }, [data, searchTerm, columnFilters]);

  // --- Sorting ---
  const sortedData = useMemo(() => {
    const sortableItems = [...filteredData];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
  }, [filteredData, sortConfig]);

  // --- Pagination ---
  const totalPages = Math.ceil(sortedData.length / pageSize);
  const paginatedData = pagination
    ? sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : sortedData;

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSelected = new Set<any>();
    if (e.target.checked) {
      paginatedData.forEach(row => newSelected.add(row.id || row._id || JSON.stringify(row)));
    }
    setSelectedIds(newSelected);
    notifySelectionChange(newSelected);
  };

  const handleSelectRow = (id: any, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) newSelected.delete(id);
    else newSelected.add(id);
    setSelectedIds(newSelected);
    notifySelectionChange(newSelected);
  };

  const notifySelectionChange = (newIds: Set<any>) => {
    const selectedRows = Array.from(newIds).map(id => data.find(r => (r.id || r._id || JSON.stringify(r)) === id));
    onSelectionChange?.(selectedRows);
  };

  const handleFilterChange = (key: string, value: any) => {
    setColumnFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
    setActiveFilterMenu(null);
  };

  const uiStyles = dataTableStyles(styles);

  return (
    <div style={uiStyles.container} className={`${finalClassNames.container} ${className || ''}`.trim()}>
      {searchable && (
        <div style={uiStyles.searchContainer} className={finalClassNames.searchContainer}>
          <Input id="datatable-search" placeholder="Search..." value={searchTerm} onChange={setSearchTerm} inputSize="sm" />
        </div>
      )}

      <table style={uiStyles.table} className={finalClassNames.table}>
        <thead style={uiStyles.thead} className={finalClassNames.thead}>
          <tr>
            {selectable && (
              <th style={uiStyles.th}>
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={paginatedData.length > 0 && selectedIds.size === paginatedData.length}
                />
              </th>
            )}
            {columns.map(col => (
              <th key={col.key} style={uiStyles.th}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div
                    style={{ cursor: col.sortable ? 'pointer' : 'default', display: 'flex', alignItems: 'center' }}
                    onClick={() => col.sortable && handleSort(col.key)}
                  >
                    {col.label}
                    {col.sortable && (
                      <span style={uiStyles.icon}>
                        {sortConfig?.key === col.key ? (sortConfig.direction === 'asc' ? '▲' : '▼') : '↕'}
                      </span>
                    )}
                  </div>
                  {col.filterable && (
                    <div style={{ position: 'relative' }}>
                      <span
                        style={{ ...uiStyles.icon, color: columnFilters[col.key] ? '#2563eb' : '#9ca3af' }}
                        onClick={(e) => { e.stopPropagation(); setActiveFilterMenu(activeFilterMenu === col.key ? null : col.key); }}
                      >🔍</span>
                      {activeFilterMenu === col.key && (
                        <div ref={filterMenuRef} style={uiStyles.filterMenu}>
                          <button style={uiStyles.filterOption(!columnFilters[col.key])} onClick={() => handleFilterChange(col.key, '')}>All</button>
                          {col.filterOptions?.map(opt => (
                            <button key={opt.value} style={uiStyles.filterOption(columnFilters[col.key] === opt.value)} onClick={() => handleFilterChange(col.key, opt.value)}>{opt.label}</button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={finalClassNames.tbody}>
          {paginatedData.length > 0 ? (
            paginatedData.map((row, idx) => {
              const rowId = row.id || row._id || JSON.stringify(row);
              return (
                <tr
                  key={idx}
                  style={uiStyles.tr(!!onRowClick || !!onRowDoubleClick || selectable)}
                  className={finalClassNames.tr}
                  onClick={() => {
                    if (onRowClick) onRowClick(row);
                    if (selectable) handleSelectRow(rowId);
                  }}
                  onDoubleClick={() => onRowDoubleClick && onRowDoubleClick(row)}
                >
                  {selectable && (
                    <td style={uiStyles.td}>
                      <input
                        type="checkbox"
                        checked={selectedIds.has(rowId)}
                        onChange={(e) => handleSelectRow(rowId, e as any)}
                      />
                    </td>
                  )}
                  {columns.map(col => (
                    <td key={col.key} style={uiStyles.td} className={finalClassNames.td}>
                      {col.render ? col.render(row[col.key], row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              );
            })
          ) : (
            <tr><td colSpan={columns.length + (selectable ? 1 : 0)} style={{ ...uiStyles.td, textAlign: 'center', padding: '2rem' }}>{t.noData}</td></tr>
          )}
        </tbody>
      </table>

      {pagination && totalPages > 1 && (
        <div style={uiStyles.pagination} className={finalClassNames.pagination}>
          <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
            {Math.min((currentPage - 1) * pageSize + 1, sortedData.length)} - {Math.min(currentPage * pageSize, sortedData.length)} of {sortedData.length}
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Button variant="outline" size="sm" disabled={currentPage === 1} onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>{t.prev}</Button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', padding: '0 0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>{currentPage} / {totalPages}</div>
            <Button variant="outline" size="sm" disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}>{t.next}</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
