import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // prevent page reload
    try {
      const res = await axios.post("http://127.0.0.1:5000/login", { email, password });
      alert(res.data.message); // "Login success"
      localStorage.setItem("token", res.data.token);
      // Navigate to dashboard or home page after login
      // navigate("/dashboard"); // optional
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        alert(err.response.data.message); 
        // Will show "User not found. Please signup first." or "Invalid password"
      } else {
        alert("Something went wrong. Make sure backend is running on 127.0.0.1:5000");
      }
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2 style={{ textAlign: "center" }}>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
          style={{ display: "block", width: "100%", marginBottom: "10px", padding: "8px" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
          style={{ display: "block", width: "100%", marginBottom: "15px", padding: "8px" }}
        />
        <button 
          type="submit"
          style={{ width: "100%", padding: "10px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "4px" }}
        >
          Login
        </button>
      </form>

      <p style={{ textAlign: "center", marginTop: "15px" }}>
        Don’t have an account? <Link to="/signup">Signup here</Link>
      </p>
    </div>
  );
}

export default Login;
