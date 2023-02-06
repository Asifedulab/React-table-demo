import React, { useMemo } from 'react';
import { useTable } from 'react-table';

function Table({ data }) {
  const columns = useMemo(
    ()=>[
    {
      Header: 'File Name',
      accessor: 'fileName',
    },
    {
      Header: 'Members',
      accessor: 'members',
    },
    {
      Header: 'Last Edit',
      accessor: 'lastEdit',
    },
    {
      Header: 'Size',
      accessor: 'size',
    },
  ],[]
  )
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data })

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default Table;