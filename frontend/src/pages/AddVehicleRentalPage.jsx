import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddVehicleRentalPage = () => {

  const navigate = useNavigate();
  const [vehicleModel, setVehicleModel] = useState('');
  const [category, setCategory] = useState('default');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [fleetSize, setFleetSize] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [dailyPrice, setDailyPrice] = useState('');
  // const[listingDate,setListingDate]=useState("")
  const [availabilityStatus, setAvailabilityStatus] = useState('available');
  const [bookingDeadline, setBookingDeadline] = useState('');
  const [insurancePolicy, setInsurancePolicy] = useState('');

  const addVehicle = async (newVehicle) => {
    try {
      const res = await fetch('/api/vehicles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newVehicle),
      });
      if (!res.ok) {
        throw new Error('Failed to add Vehicle');
      }
      return true;
    } catch (error) {
      console.error('Error adding vehicle:', error);
      return false;
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    const data = {
      vehicleModel,

      category,
      description,
      agency: {
        name,
        contactEmail,
        fleetSize,
      },
      location: {
        city,
        state,
      },
      dailyPrice,

      availabilityStatus,
      bookingDeadline,
      insurancePolicy,
    };

    console.log(data);
    addVehicle(data);
    navigate("/")
  };

  return (
    <div className="create">
      <h2>Add a New Vehicle Rental</h2>
      <form onSubmit={submitForm}>
        <label>Vehicle Model:</label>
        <input
          type="text"
          value={vehicleModel}
          onChange={(e) => setVehicleModel(e.target.value)}
          required
        />
        <label>Category:</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Economy">Economy</option>
          <option value="Luxury">Luxury</option>
          <option value="SUV">SUV</option>
          <option value="Van">Van</option>
          <option value="Truck">Truck</option>
        </select>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <label>Agency Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        <label>Agency Email:</label>
        <input
          type="email"
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
          required
        />
        <label>Fleet Size:</label>
        <input
          type="number"
          value={fleetSize}
          onChange={(e) => setFleetSize(Number(e.target.value))}
          min="0"
        />
        <label>City:</label>
        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} required />
        <label>State:</label>
        <input type="text" value={state} onChange={(e) => setState(e.target.value)} required />
        <label>Daily Price:</label>
        <input
          type="number"
          value={dailyPrice}
          onChange={(e) => setDailyPrice(Number(e.target.value))}
          step="0.01"
          min="0"
          required
        />
        <label>Availability Status:</label>
        <select value={availabilityStatus} onChange={(e) => setAvailabilityStatus(e.target.value)}>
          <option value="available">Available</option>
          <option value="rented">Rented</option>
          <option value="maintenance">Maintenance</option>
        </select>
        <label>Booking Deadline:</label>
        <input
          type="date"
          value={bookingDeadline}
          onChange={(e) => setBookingDeadline(e.target.value)}
        />
        <label>Insurance Policy:</label>
        <input
          type="text"
          value={insurancePolicy}
          onChange={(e) => setInsurancePolicy(e.target.value)}
          required
        />
        <button>Add Vehicle Rental</button>
      </form>
    </div>
  );
};

export default AddVehicleRentalPage;
