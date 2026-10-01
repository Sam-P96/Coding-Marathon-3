import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsAuthenticated }) => {

    const navigate = useNavigate();
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const res = await fetch(`/api/users/login`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                username,
                password
            })
        })

        const user = await res.json();
        if (!res.ok) {
            setError(user.error);
            return;
        }

        localStorage.setItem("user", JSON.stringify(user))
        setIsAuthenticated(true);
        console.log("Login successfully")
        navigate("/")
    };

      return (
    <div className="create">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Email address:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button>Log in</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default Login;
