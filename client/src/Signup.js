import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/signup", { name, email, password });

      if (res && res.data && res.data.message) {
        alert(res.data.message); // shows "User registered successfully"
        navigate("/login");
      } else {
        alert("Signup successful, but no message from server.");
        navigate("/login");
      }

    } catch (err) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.message) {
        alert(err.response.data.message); // "User already exists" or other backend message
      } else if (err.request) {
        alert("No response from server. Check backend is running and CORS is enabled.");
      } else {
        alert("Something went wrong: " + err.message);
      }
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2 style={{ textAlign: "center" }}>Signup</h2>
      <form onSubmit={handleSignup}>
        <input 
          placeholder="Name" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
          required
          style={{ display: "block", width: "100%", marginBottom: "10px", padding: "8px" }}
        />
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
          autoComplete="new-password"
          required
          style={{ display: "block", width: "100%", marginBottom: "15px", padding: "8px" }}
        />
        <button 
          type="submit"
          style={{ width: "100%", padding: "10px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "4px" }}
        >
          Signup
        </button>
      </form>

      <p style={{ textAlign: "center", marginTop: "15px" }}>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}

export default Signup;
