import { useEffect, useState } from "react";
import { searchEmployees, deleteEmployee } from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";
import { isAdmin } from "../utils";

const ListEmployeeComponent = () => {

  const [employees, setEmployees] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [sortBy, setSortBy] = useState("firstName");
  const [direction, setDirection] = useState("asc");

  const pageSize = 5;
  const navigator = useNavigate();

  /* ================= LOAD EMPLOYEES ================= */
  const getAllEmployees = () => {
    searchEmployees(keyword, currentPage, pageSize, sortBy, direction)
      .then((response) => {
        setEmployees(response.data.content);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => console.error(error));
  };

  /*  LOAD ON PAGE LOAD + PAGINATION + SORT */
  useEffect(() => {
    getAllEmployees();
  }, [keyword, currentPage, sortBy, direction]);

  /* ================= HANDLERS ================= */
  const handleSearch = (e) => {
    setKeyword(e.target.value);
    setCurrentPage(0);
  };

  const toggleSort = (field) => {
    if (sortBy === field) {
      setDirection(direction === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setDirection("asc");
    }
  };

  const addNewEmployee = () => {
    navigator("/add-employee");
  };

  const updateEmployee = (id) => {
    navigator(`/edit-employee/${id}`);
  };

  const removeEmployee = (id) => {
    deleteEmployee(id)
      .then(() => getAllEmployees())
      .catch((err) => console.error(err));
  };

  /* ================= UI ================= */
  return (
    <div className="container">
      <h2 className="text-center">List of Employees</h2>

      {/* 🔍 SEARCH */}
      <input
        type="text"
        placeholder="Search by name or email"
        className="form-control mb-3"
        value={keyword}
        onChange={handleSearch}
      />

     {isAdmin() && (
  <button className="btn btn-primary mb-2" onClick={addNewEmployee}>
    Add Employee
  </button>
)}
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Employee Id</th>

            <th onClick={() => toggleSort("firstName")} style={{ cursor: "pointer" }}>
              First Name {sortBy === "firstName" && (direction === "asc" ? "⬆️" : "⬇️")}
            </th>

            <th onClick={() => toggleSort("lastName")} style={{ cursor: "pointer" }}>
              Last Name {sortBy === "lastName" && (direction === "asc" ? "⬆️" : "⬇️")}
            </th>

            <th onClick={() => toggleSort("emailId")} style={{ cursor: "pointer" }}>
              Email {sortBy === "emailId" && (direction === "asc" ? "⬆️" : "⬇️")}
            </th>

          
          </tr>
        </thead>

        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.emailId}</td>
            <td>
  {isAdmin() && (
    <>
      <button
        className="btn btn-info"
        onClick={() => updateEmployee(employee.id)}>Update</button>

      <button
        className="btn btn-danger"
        onClick={() => removeEmployee(employee.id)}style={{ marginLeft: "10px" }}>Delete
</button>
    </>
  )}
</td>

            </tr>
          ))}
        </tbody>
      </table>

      {/* ✅ PAGINATION */}
      <div className="d-flex justify-content-center">
        <button
          className="btn btn-secondary me-2"
          disabled={currentPage === 0}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>

        <span className="align-self-center">
          Page {currentPage + 1} of {totalPages}
        </span>

        <button
          className="btn btn-secondary ms-2"
          disabled={currentPage === totalPages - 1}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ListEmployeeComponent;
