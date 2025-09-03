import { useEffect, useState } from "react"
import type { Car } from "../type"
import { deleteCar, getCars } from "../api/carapi";
import { DataGrid } from "@mui/x-data-grid";
import type { GridCellParams, GridColDef } from "@mui/x-data-grid";
import { Button, Snackbar, Tooltip } from "@mui/material";
import AddCar from "../components/AddCar";
import EditCar from "../components/EditCar";
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuthStore } from "../store";

export default function CarList() {
    const { logout } = useAuthStore();
    const [data, setData] = useState<Car[]>([]);
    const [toastVal, setToastVal] = useState({
        open: false, msg: ''
    });

    const columns: GridColDef[] = [
        {field: 'brand', headerName: '제조사', width: 200},
        {field: 'model', headerName: '모델', width: 200},
        {field: 'color', headerName: '색상', width: 200},
        {field: 'registrationNumber', headerName: '등록넘버', width: 150},
        {field: 'modelYear', headerName: '연식', width: 150},
        {field: 'price', headerName: '가격', width: 150},
        {
            field: 'edit',
            headerName: '',
            width: 90,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params: GridCellParams) => (
                <EditCar 
                    carData={params.row} 
                    loadCarData={loadCarData}
                />
            )
        },
        {
            field: 'delete',
            headerName: '',
            width: 90,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params: GridCellParams) => (
                <Tooltip title="삭제">
                    <IconButton size="small" onClick={() => deleteCarData(params.row.id)}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            )
        }
    ]

    const loadCarData = () => {
        getCars()
        .then(res => setData(res))
        .catch(err => console.log(err));
    }

    const deleteCarData = (id: number) => {
        if(confirm(`${id}번 데이터를 삭제하시겠습니까?`)) {
            deleteCar(id)
            .then((res) => {
                loadCarData();
                setToastVal({open: true, msg: `${res}번 데이터가 삭제되었습니다`});
            })
            .catch(err => console.log(err));
        }
    }

    const handleLogout = () => {
        sessionStorage.setItem("jwt", "");
        logout();
    }

    useEffect(() => {
        loadCarData();
    }, []);

    return (
        <>
            <AddCar loadCarData={loadCarData}/>
            <Button onClick={handleLogout}>로그아웃</Button>
            <DataGrid 
                rows={data}
                columns={columns}
                getRowId={row => row.id}
                disableRowSelectionOnClick={true}
                showToolbar
            />
            <Snackbar
                open={toastVal.open}
                onClose={() => setToastVal({open: false, msg: ''})}
                message={toastVal.msg}
                autoHideDuration={2000}
            />
        </>
    )
}