import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import VehicleRentalListing from "../components/VehicleRentalListing";

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
      <VehicleRentalListing vehicle={vehicle}/>

      <button onClick={()=> handleGoHome()}>Go Home</button>
      <button onClick={() => navigate('/')}>Edit</button>
    </div>
  );
};

export default VehicleRentalPage;

