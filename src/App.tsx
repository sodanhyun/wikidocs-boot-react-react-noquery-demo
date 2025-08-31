import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Login from './components/Login';
import { Route, Routes } from 'react-router-dom';
import Carlist from './components/Carlist';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Container maxWidth="xl">
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Car Shop
          </Typography>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path='/' element={<PrivateRoute><Carlist/></PrivateRoute>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </Container>
  );
}

export default App;