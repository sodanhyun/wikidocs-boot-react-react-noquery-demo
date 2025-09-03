import { useState } from "react";
import type { Car } from "../type";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { addCar } from "../api/carapi";
import CarDialogContent from "./CarDialogContent";

type AddCarProps = {
    loadCarData: () => void;
}

export default function AddCar({ loadCarData } : AddCarProps) {
    const [open, setOpen] = useState(false);
    const [car, setCar] = useState<Car>({
        brand: '',
        model: '',
        color: '',
        registrationNumber: '',
        modelYear: 0,
        price: 0
    });

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const name = e.target.name;
        setCar({ ...car, [name]: value});
    }

    const handleSave = async () => {
        await addCar(car);
        // car list reload
        loadCarData();
        setCar({
            brand: '',
            model: '',
            color: '',
            registrationNumber: '',
            modelYear: 0,
            price: 0
        });
        handleClose();
    }

    return (
        <>
            <Button onClick={handleOpen}>New Car</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Car</DialogTitle>
                <DialogContent>
                    <CarDialogContent 
                        car={car}
                        handleChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSave}>저장</Button>
                    <Button onClick={handleClose}>닫기</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}