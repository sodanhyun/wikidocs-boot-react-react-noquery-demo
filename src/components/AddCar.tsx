import { useState } from 'react';
import { addCar } from '../api/carapi';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import CarDialogContent from './CarDialogContent';
import Button from '@mui/material/Button';
import { Car } from '../types';

interface AddCarProps {
  loadCarData: () => void;
}

function AddCar({loadCarData}: AddCarProps) {

  const [open, setOpen] = useState(false);
  const [car, setCar] = useState<Car>({
    brand: '',
    model: '',
    color: '',
    registrationNumber: '',
    modelYear: 0,
    price: 0
  });

  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };    
  
  const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    setCar({...car, [event.target.name]: event.target.value});
  }

  const handleSave = () => {
    addCar(car);
    loadCarData();
    setCar({ brand: '', model: '', color: '', registrationNumber: '', modelYear: 0, price: 0 });
    handleClose();
  }  

  return(
    <>
      <Button onClick={handleClickOpen}>New Car</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New car</DialogTitle>
          <CarDialogContent car={car} handleChange={handleChange} />
        <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddCar;