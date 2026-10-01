import { useParams, useNavigate } from 'react-router-dom';

const EditVehicleRentalPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [vehicleModel, setVehicleModel] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [fleetSize, setFleetSize] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [dailyPrice, setDailyPrice] = useState('');
  // const[listingDate,setListingDate]=useState("")
  const [availabilityStatus, setAvailabilityStatus] = useState('');
  const [bookingDeadline, setBookingDeadline] = useState('');
  const [insurancePolicy, setInsurancePolicy] = useState('');

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const res = await fetch(`/api/vehicles/${id}`);
        const data = await res.json();
        setVehicleModel(data.productName);
        setCategory(data.category);
        setDescription(data.description);

        setContactEmail(data.agency.contactEmail);
        setFleetSize(data.agency.fleetSize);
        setName(data.agency.name);

        setCity(data.location.city);
        setState(data.location.state);
        setDailyPrice(data.dailyPrice);
        setAvailabilityStatus(data.availabilityStatus);
        setInsurancePolicy(data.insurancePolicy);
        setBookingDeadline(data.bookingDeadline);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchVehicle();
  }, [id]);

  const updateVehicle = async (vehicle) => {
    try {
      const res = await fetch(`/api/vehicles/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vehicle),
      });
      if (!res.ok) {
        throw new Error('Failed to update product');
      }
    } catch (error) {
      console.error(error);
      return false;
    }
    return true;
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
    updateVehicle(data);
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

export default EditVehicleRentalPage;
