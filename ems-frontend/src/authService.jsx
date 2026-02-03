import axios from "axios";

const login = async (username, password) => {
  alert("AUTH SERVICE CALLED"); // 👈 MUST SHOW

  const response = await axios.post(
    "http://localhost:8080/api/auth/login",
    { username, password }
  );

  return response.data;
};

export default { login };