import VehicleRentalListings from "../components/VehicleRentalListings";
import { useState, useEffect } from "react";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [vehicles, setVehicles] = useState(null);

  
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await fetch(`/api/vehicles`);
        if (!res.ok) throw new Error("Something wrong while fetching API")
        const data = await res.json();
        setVehicles(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, [])

  if (loading) return <>Loading....</>
  if (error) return <>Something went wrong: {error}</>
  
  return (
    <div className="home">
      { vehicles && <VehicleRentalListings vehicles={vehicles}/>}
    </div>
  );
};

export default Home;

