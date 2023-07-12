import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import './UserRegistrationForm.css';

const UserRegistrationForm = () => {
  
 const navigate =useNavigate();
 const [role,setRole] = useState();

  const [user, setUser] = useState({
    loginId: '',
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    password: '',
    confirmpassword:' '
  });

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleChangeRole = (event) => {
    setRole(event.target.value);
  };

  const userSend = {
    loginId: user.loginId,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    contactNumber: user.contactNumber, 
    roles:[role],
    password: user.password,
  }

  const handleSubmit = (event) => {

    console.log(userSend);

    event.preventDefault();
    axios
      .post('http://localhost:8080/api/v1.0/moviebooking/register', userSend) 
      .then((response) => {
        console.log(response.data);
        alert("LoginId created");
        navigate('/');
        
      })
      .catch((error) => {
        console.error(error.response.data);
        alert("Login ID is already taken");
      });
  };

  return (
    <form className="user-registration-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="loginId">Login ID:</label>
        <input
          type="text"
          className="form-control"
          id="loginId"
          name="loginId"
          value={user.loginId}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          className="form-control"
          id="firstName"
          name="firstName"
          value={user.firstName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          className="form-control"
          id="lastName"
          name="lastName"
          value={user.lastName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">  
        <label htmlFor="contactNumber">Contact Number:</label>
        <input
          type="text"
          className="form-control"
          id="contactNumber"
          name="contactNumber"
          value={user.contactNumber}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Confirm Password:</label>
        <input
          type="password"
          className="form-control"
          id="confirmpassword"
          name="confirmpassword"
          value={user.confirmpassword}
          onChange={handleChange}
          required
        />
      </div>
      {!(user.password === user.confirmpassword) && <p>Passwords do not match</p>}
      <div className="form-group"> 
        <label htmlFor="role">Role:</label>
        <select onChange={handleChangeRole} name='role' value={role}>
          <option>Please choose one option</option>
          <option value="admin"> Admin</option>
          <option value="user">User</option>         
        </select>
      </div>      
      {(user.password === user.confirmpassword) &&
        <button type="submit" className="btn btn-primary">Register</button>
      }
    </form>
  );
};

export default UserRegistrationForm;
