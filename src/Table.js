import React, { useMemo,useRef } from 'react';
import { useGlobalFilter, useTable } from 'react-table';


function Table({ data }) {
  // const [filterInput, setFilterInput] = useState('');
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
  

  const searchInput = useRef(null);

  const handleSearch = e => {
    setGlobalFilter(e.target.value || undefined);
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    setGlobalFilter,
    prepareRow,
  } = useTable({ columns, data, initialState: {
    pageIndex: 0,
  } },useGlobalFilter)

  return (
    <div>
     <input
        ref={searchInput}
        on  Change={handleSearch}
        placeholder={"Search All"}
        style={{ width: "100%", marginBottom: "1rem" }}
      />        
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
          );
        })}
      </tbody>
    </table>
    </div>
  )
}

export default Table;
