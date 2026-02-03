import api from "./axiosConfig";

const EMPLOYEE_API_BASE_URL = "/api/employees";



/* ================= GET ALL ================= */
export const getAllEmployees = () => {
  return api.get(EMPLOYEE_API_BASE_URL);
};

/* ================= SEARCH / PAGED ================= */
export const searchEmployees = (keyword, page, size, sortBy, direction) => {
  return api.get(`${EMPLOYEE_API_BASE_URL}/search`, {
    params: { keyword, page, size, sortBy, direction }
  });
};

/* ================= GET BY ID ================= */
export const getEmployee = (id) => {
  return api.get(`${EMPLOYEE_API_BASE_URL}/${id}`);
};

/* ================= CREATE ================= */
export const createEmployee = (employee) => {
  return api.post(EMPLOYEE_API_BASE_URL, employee);
};

/* ================= UPDATE ================= */
export const updateEmployee = (id, employee) => {
  return api.put(`${EMPLOYEE_API_BASE_URL}/${id}`, employee);
};

/* ================= DELETE ================= */
export const deleteEmployee = (id) => {
  return api.delete(`${EMPLOYEE_API_BASE_URL}/${id}`);
};
