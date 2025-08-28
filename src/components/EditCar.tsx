import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import CarDialogContent from './CarDialogContent';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import { Car } from '../types';
import { updateCar } from '../api/carapi';

interface EditCarProps {
  carData: Car;
  loadCarData: () => void;
}

function EditCar({ carData, loadCarData }: EditCarProps) {
  const [open, setOpen] = useState(false);
  const [car, setCar] = useState<Car>({
    id: 0,
    brand: '',
    model: '',
    color: '',
    registrationNumber: '',
    modelYear: 0,
    price: 0
  });

  const handleClickOpen = () => {
    setOpen(true);
    setCar({
      id: carData.id,
      brand: carData.brand,
      model: carData.model,
      color: carData.color,
      registrationNumber: carData.registrationNumber,
      modelYear: carData.modelYear,
      price: carData.price
    });
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSave = async () => {
    await updateCar(car);
    loadCarData();
    setCar({ id: 0, brand: '', model: '', color: '', registrationNumber: '', modelYear: 0, price: 0 });    
    setOpen(false);
  }

  const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    setCar({...car, [event.target.name]: event.target.value});
  }

  return(
    <>
      <Tooltip title="Edit car">
        <IconButton aria-label="edit" size="small" onClick={handleClickOpen}>
          <EditIcon fontSize= "small" />
        </IconButton>      
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit car</DialogTitle>
        <CarDialogContent car={car} handleChange={handleChange}/>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>    
    </>
  );
}

export default EditCar;