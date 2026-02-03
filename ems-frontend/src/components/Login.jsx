import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import authService from "../authService";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    console.log("LOGIN CLICKED");

    try {
      const response = await authService.login(username, password);

      console.log("TOKEN:", response.token);
      console.log("ROLES:", response.roles);

      // SAVE TO CONTEXT + LOCALSTORAGE
      login(response.token, response.roles);

      navigate("/employees");

 } catch (err) {
      console.error(err);
      setError("Invalid username or password");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "80px auto" }}>
      <h2>Login</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;