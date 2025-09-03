import { useEffect, useState } from 'react';
import { getCars, deleteCar } from '../api/carapi.js';
import { DataGrid, GridColDef, GridCellParams, GridToolbar } from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import AddCar from '../components/AddCar.js';
import EditCar from '../components/EditCar.js';
import { Car } from '../types.js';
import useAuthStore from "../store.ts";

function Carlist({}) {
  const {logout} = useAuthStore();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<Car[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  const loadCarData = () => {
    setIsLoading(true);
    getCars()
    .then(res => {
      setData(res);
      setIsLoading(false);
      setIsError(false);
    })
    .catch(err => {
      console.log(err);
      setIsLoading(false);
      setIsError(true);
    })
  }

  useEffect(() => {
    loadCarData();
  }, [])

  const columns: GridColDef[] = [
    {field: 'brand', headerName: 'Brand', width: 200},
    {field: 'model', headerName: 'Model', width: 200},
    {field: 'color', headerName: 'Color', width: 200},
    {field: 'registrationNumber', headerName: 'Reg.nr.', width: 150},
    {field: 'modelYear', headerName: 'Model Year', width: 150},
    {field: 'price', headerName: 'Price', width: 150},
    {
      field: 'edit',
      headerName: '',
      width: 90,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) =>
        <EditCar carData={params.row} loadCarData={loadCarData} />
    },
    {
      field: 'delete',
      headerName: '',
      width: 90,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => (
        <IconButton aria-label="delete" size="small"
          onClick={ async () => {
            if (window.confirm(`Are you sure you want to delete ${params.row.brand} ${params.row.model}?`)) {
              await deleteCar(params.row.id);
              loadCarData();
            } 
          }}       
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      ),
    },
  ]; 

  const handleLogout = () => {
    logout();
    sessionStorage.setItem("jwt", "");
  }

  if (isLoading) {
    return <span>Loading...</span>
  }
  else if (isError) {
    return <span>Error when fetching cars...</span>
  }
   else {
    return (
      <>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <AddCar loadCarData={loadCarData} />
          <Button onClick={handleLogout}>Log out</Button>
        </Stack>
        <DataGrid
          rows={data}
          columns={columns}
          disableRowSelectionOnClick={true}
          getRowId={row => row.id}
          slots={{ toolbar: GridToolbar }}
        />
        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={() => setOpen(false)}
          message="Car deleted" />
        </>
    );
  }
}

export default Carlist;
