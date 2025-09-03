import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Login from './pages/Login';
import { Navigate, Route, Routes } from 'react-router-dom';
import Carlist from './pages/Carlist';
import useAuthStore from "./store.ts";

interface PrivateRouteProps {
  children: JSX.Element;
}

function PrivateRoute({ children }: PrivateRouteProps) {
  const {isAuthenticated} = useAuthStore();

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <Container maxWidth="xl">
      <CssBaseline />
      <AppBar position="static">
        <Toolbar >
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