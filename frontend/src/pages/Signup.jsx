import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = ({ setIsAuthenticated }) => {
    const navigate = useNavigate();

    const [name, setName] = useState(null);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [licenseNumber, setLicenseNumber] = useState(null);
    const [dateOfBirth, setDateOfBirth] = useState(null);
    const [licenseExpiryDate, setLicenseExpiryDate] = useState(null);
    const [yearsOfExperience, setYearsOfExperience] = useState(null);
    const [city, setCity] = useState(null);
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch(`/api/users/signup`, {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(
                {name,
                username,
                password,
                phone_number: phoneNumber,
                licenseNumber,
                date_of_birth: dateOfBirth,
                address: {
                    licenseExpiryDate: licenseExpiryDate,
                    city: city,
                    yearsOfExperience: yearsOfExperience
                }}
            )
        })

        const user = await res.json();
        if (!res.ok) {
            setError(user.error);
            return;
        }
        console.log(user)

        localStorage.setItem("user", JSON.stringify(user));
        setIsAuthenticated(true);
        console.log("signup successfully")
        navigate("/")
    }

    return (
        <div className="signup">

            <form onSubmit={handleSubmit}>

            <label>Name:</label>
            <input type="text" required value={name} onChange={(e) => setName(e.target.value)} />

            <label>Username:</label>
            <input type="text" required value={username} onChange={(e) => setUsername(e.target.value)} />

            <label>Password:</label>
            <input type="text" required value={password} onChange={(e) => setPassword(e.target.value)} />

            <label>Phone Number:</label>
            <input type="tel" required value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />

            <label>License Number:</label>
            <input type="text" required value={licenseNumber} onChange={(e) => setLicenseNumber(e.target.value)} />

            <label>Date Of Birth:</label>
            <input type="date" required value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />

            <label>License Expiry Date:</label>
            <input type="date" required value={licenseExpiryDate} onChange={(e) => setLicenseExpiryDate(e.target.value)} />

            <label>Year Of Experience:</label>
            <input type="number" required value={yearsOfExperience} onChange={(e) => setYearsOfExperience(e.target.value)} />

            <label>City:</label>
            <input type="text" required value={city} onChange={(e) => setCity(e.target.value)} />
     
            {error && <p className="error">{error}</p>}

            <button>Signup</button>
            </form>
            
        </div>
    )


}

export default Signup