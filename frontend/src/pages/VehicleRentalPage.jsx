import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const VehicleRentalPage = ({ isAuthenticated }) => {
  const [vehicle, setVehicle] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));
  const token = user ? user.token : null;

  const deleteVehicle = async (id) => {
    try {
      const res = await fetch(`/api/vehicles/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      console.log(res);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const res = await fetch(`/api/vehicles/${id}`);
        if (!res.ok) throw new Error('Failed to fetch vehicle');
        const data = await res.json();
        if (data) setVehicle(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchVehicle();
  }, [id]);

  const handleGoHome = () => {
    navigate('/');
  };

  if (loading) return <>Loading....</>;
  if (error) return <>Something went wrong: {error}</>;

  return (
    <div className="rental-preview">
      <h2>Vehicle Rental Details</h2>
      <h3>Vehicle Model: {vehicle.vehicleModel}</h3>
      <p>Category: {vehicle.category}</p>
      <p>Description: {vehicle.description}</p>
      <p>Listing Date: {vehicle.listingDate}</p>
      <p>Availability: {vehicle.availabilityStatus}</p>
      <p>Booking Deadline: {vehicle.bookingDeadline}</p>
      <p>Insurance Poilicy: {vehicle.insurancePoilicy}</p>
      <h3>Agency</h3>
      <p>Name: {vehicle.agency.name}</p>
      <p>Contact Email: {vehicle.agency.contactEmail}</p>
      <p>Fleet Size: {vehicle.agency.fleetSize}</p>
      <h3>Location</h3>
      <p>City: {vehicle.location.city}</p>
      <p>State: {vehicle.location.state}</p>

      <button onClick={() => handleGoHome()}>Go Home</button>

      {isAuthenticated && (
        <>
          <button onClick={() => navigate(`/vehicles/edit/${vehicle.id}`)}>Edit</button>
          <button onClick={() => deleteVehicle(id)}>Delete</button>
        </>
      )}
    </div>
  );
};

export default VehicleRentalPage;
