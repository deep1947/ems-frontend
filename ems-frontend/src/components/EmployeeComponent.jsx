import React, { useEffect, useState } from 'react';
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';

const EmployeeComponent = () => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailId, setEmailId] = useState('');

  const { id } = useParams();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    emailId: ''
  });

  useEffect(() => {
    if (id) {
      getEmployee(id)
        .then(response => {
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setEmailId(response.data.emailId);
        })
        .catch(error => console.log(error));
    }
  }, [id]);

  const saveOrUpdateEmployee = (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    const employee = { firstName, lastName, emailId };

    if (id) {
      updateEmployee(id, employee)
        .then(() => navigate('/employees'))
        .catch(error => console.log(error));
    } else {
      createEmployee(employee)
        .then(() => navigate('/employees'))
        .catch(error => console.log(error));
    }
  };

  const validateForm = () => {
    let valid = true;
    const errorsCopy = { ...errors };

    if (firstName.trim()) {
      errorsCopy.firstName = '';
    } else {
      errorsCopy.firstName = 'First Name is required';
      valid = false;
    }

    if (lastName.trim()) {
      errorsCopy.lastName = '';
    } else {
      errorsCopy.lastName = 'Last Name is required';
      valid = false;
    }

    if (emailId.trim()) {
      errorsCopy.emailId = '';
    } else {
      errorsCopy.emailId = 'EmailId is required';
      valid = false;
    }

    setErrors(errorsCopy);
    return valid;
  };

  const pageTitle = () => {
    return id
      ? <h2 className="text-center">Update Employee</h2>
      : <h2 className="text-center">Add Employee</h2>;
  };

  return (
    <div className="container">
      <br /><br />
      <div className="row">
        <div className="card col-md-6 offset-md-3">
          {pageTitle()}

          <div className="card-body">
            <form onSubmit={saveOrUpdateEmployee}>

              <div className="form-group mb-2">
                <label className="form-label">First Name :</label>
                <input
                  type="text"
                  value={firstName}
                  className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                  onChange={e => setFirstName(e.target.value)}
                />
                {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Last Name :</label>
                <input
                  type="text"
                  value={lastName}
                  className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                  onChange={e => setLastName(e.target.value)}
                />
                {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Email :</label>
                <input
                  type="emailId"
                  value={emailId}
                  className={`form-control ${errors.emailId ? 'is-invalid' : ''}`}
                  onChange={e => setEmailId(e.target.value)}
                />
                {errors.emailId && <div className="invalid-feedback">{errors.emailId}</div>}
              </div>

              <button type="submit" className="btn btn-success">
                Submit
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeComponent;
