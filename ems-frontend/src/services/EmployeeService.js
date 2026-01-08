import axios from "axios";

const EMPLOYEE_API_BASE_URL = "http://localhost:8080/api/employees";

export const listEmployees = () => axios.get(EMPLOYEE_API_BASE_URL);

export const createEmployee = (employee)=>axios.post(EMPLOYEE_API_BASE_URL,employee);

export const getEmployee = (employeeId)=>axios.get(EMPLOYEE_API_BASE_URL + '/' + employeeId);

export const searchEmployees = (keyword, page, size, sortBy, direction) => {
  return axios.get(`${EMPLOYEE_API_BASE_URL}/search`, {params: {keyword,page,size,sortBy,direction}});
}

export const getEmployeesPaged = (page, size) => {
  return axios.get(`${EMPLOYEE_API_BASE_URL}/paged?page=${page}&size=${size}`);
};


export const updateEmployee = (employeeId,employee)=>axios.put(EMPLOYEE_API_BASE_URL + '/' + employeeId,employee);

export const deleteEmployee = (employeeId)=>axios.delete(EMPLOYEE_API_BASE_URL + '/' + employeeId);