import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'name', headerName: 'name', width: 100 },
  { field: 'price', headerName: 'price', width: 100 },
  { field: 'age', headerName: 'Age', type: 'number', width: 100, },
  { field: 'simbol', headerName: 'simbol',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 100,
    valueGetter: (params) =>
      `${params.row.name|| ''} ${params.row.price || ''}`,
  },
];

const rows = [
  { id: 1, name: 'Snow',price: 'Jon', age: 35 },
  { id: 2, name: 'Lannister', price: 'Cersei', age: 42 },
  { id: 3, name: 'Lannister', price:'Jaime', age: 45 },
  { id: 4, name: 'Stark', price:'Arya', age: 16 },
  { id: 5, name: 'Targaryen', price: 'Daenerys', age: null },
  { id: 6, name: 'Melisandre', price: null, age: 150 },
  { id: 7, name: 'Clifford', price:'Ferrara', age: 44 },
  { id: 8, name:'Frances', price: 'Rossini', age: 36 },
  { id: 9, name:'Roxie', price: 'Harvey', age: 65 },
  { id: 10, name:'Roxie', price: 'Harvey', age: 65 },
];

export default function DataTable() {
  return (
    <div style={{ height: 700, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}