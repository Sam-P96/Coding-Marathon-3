import { BrowserRouter, Routes, Route } from 'react-router-dom';

// pages & components
import Home from './pages/HomePage';
import AddVehicleRentalPage from './pages/AddVehicleRentalPage';
import Navbar from './components/Navbar';
import NotFoundPage from './pages/NotFoundPage';
import VehicleRentalPage from './pages/VehicleRentalPage';
import EditVehicleRentalPage from './pages/EditVehicleRentalPage';
import { Navigate } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { useState } from 'react';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user && user.token ? true : false;
  });
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/add-rental"
              element={isAuthenticated ? <AddVehicleRentalPage /> : <Navigate to="/signup" />}
            />
            <Route path="*" element={<NotFoundPage />} />
            <Route
              path="/vehicles/:id"
              element={<VehicleRentalPage isAuthenticated={isAuthenticated} />}
            />
            <Route
              path="/vehicles/edit/:id"
              element={isAuthenticated ? <EditVehicleRentalPage /> : <Navigate to="/signup" />}
            />
            <Route
              path="/signup"
              element={
                isAuthenticated ? (
                  <Navigate to="/" />
                ) : (
                  <Signup setIsAuthenticated={setIsAuthenticated} />
                )
              }
            />
            <Route
              path="/login"
              element={
                isAuthenticated ? (
                  <Navigate to="/" />
                ) : (
                  <Login setIsAuthenticated={setIsAuthenticated} />
                )
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;