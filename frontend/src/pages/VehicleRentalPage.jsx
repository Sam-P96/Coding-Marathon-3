import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const VehicleRentalPage = () => {

  const [vehicle, setVehicle] = useState(null);
  const {id} = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const res = await fetch(`/api/vehicles/${id}`);
        if (!res.ok) throw new Error("Failed to fetch vehicle");
        const data = await res.json();
        if (data) setVehicle(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchVehicle();
  }, [id] )

  const handleGoHome = () => {
    navigate("/")
  }

  if (loading) return <>Loading....</>
  if (error) return <>Something went wrong: {error}</>

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


      <button onClick={()=> handleGoHome()}>Go Home</button>
      <button onClick={() => navigate(`/vehicles/edit/${vehicle.id}`)}>Edit</button>
    </div>
  );
};

export default VehicleRentalPage;

