import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login.jsx";
import ListEmployeeComponent from "./components/ListEmployeeComponent.jsx";
import EmployeeComponent from "./components/EmployeeComponent.jsx";
import AdminDashboard from "./components/AdminDashboard.jsx";
import UserDashboard from "./components/UserDashboard.jsx";
import Unauthorized from "./components/Unauthorized.jsx";
import RequireAuth from "./auth/RequireAuth.jsx";
import RequireRole from "./auth/RequireRole.jsx";
import "./App.css";
import HeaderComponent from "./components/HeaderComponent.jsx"; 
import FooterComponent from "./components/FooterComponent.jsx";


function App() { 
  return ( <BrowserRouter>
   <HeaderComponent />


<Routes>
  {/* PUBLIC */}
  <Route path="/" element={<Login />} />

  {/* EMPLOYEE LIST */}
  <Route
    path="/employees"
    element={
      <RequireAuth>
        <ListEmployeeComponent />
      </RequireAuth>
    }
  />

  {/* ADD EMPLOYEE */}
  <Route
    path="/add-employee"
    element={
      <RequireAuth>
        <EmployeeComponent />
      </RequireAuth>
    }
  />

  {/* EDIT EMPLOYEE */}
  <Route
    path="/edit-employee/:id"
    element={
      <RequireAuth>
        <EmployeeComponent />
      </RequireAuth>
    }
  />

  {/* ADMIN */}
  <Route
    path="/admin"
    element={
      <RequireAuth>
        <RequireRole role="ROLE_ADMIN">
          <AdminDashboard />
        </RequireRole>
      </RequireAuth>
    }
  />

  {/* USER */}
  <Route
    path="/user"
    element={
      <RequireAuth>
        <RequireRole role="ROLE_USER">
          <UserDashboard />
        </RequireRole>
      </RequireAuth>
    }
  />

  <Route path="/unauthorized" element={<Unauthorized />} />
</Routes>
<FooterComponent /> 
</BrowserRouter>
);
}
export default App;