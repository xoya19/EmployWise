           import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../src/index.css";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
  
    async function handleLogin(event) {
      event.preventDefault();
      setError(null);
  
      try {
        const response = await fetch("https://reqres.in/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email.trim(),
            password: password.trim()
          }),
        });
  
        const data = await response.json();
        console.log("API response data:", data);
  
        if (response.ok) {
          console.log("Login successful, token:", data.token);
          localStorage.setItem("token", data.token);
          navigate("/users");
        } else {
          console.error("Login failed:", data);
          setError(data.error || "Invalid credentials");
        }
      } catch (error) {
        console.error("Network error:", error);
        setError("Network error, please try again!");
      }
    }
  
    return (
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="error">{error}</p>}
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }