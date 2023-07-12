import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './UserRegistrationForm.css';
import { Link, useNavigate} from 'react-router-dom';

const Login = () => {

  const [credentials, setCredentials] = useState({
    loginId: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { loginId, password } = credentials;
    if (loginId) {

      console.log("LOGIN   ->> ",loginId,password)

      axios
        .post('http://localhost:8080/api/v1.0/moviebooking/login', credentials)
        .then((response) => {
          console.log(response.data);

          const data = response.data

          // Handle success response here
          // Redirect to the addData page
          sessionStorage.setItem("login",loginId)
          sessionStorage.setItem("token",data.accessToken)
          sessionStorage.setItem("tokenType","Bearer")


          if(data.roles[0] === "ROLE_USER"){
            console.log(data.roles)
            sessionStorage.setItem("role","user")
            navigate("/Home")
          }    
          
          if(data.roles[0] === "ROLE_ADMIN"){
            console.log(data.roles)
            sessionStorage.setItem("role","admin")
            navigate("/Home")
          } 
         
        })
        .catch((error) => {
          console.error(error.response.data);
          // Handle error here
          alert('Invalid login credentials');
        });
    } else {
      // Handle the case when loginId is missing
      console.error('Login ID is required');
    }
  };

  return (
    <div>
    <div className="login-container">
      <div className="welcome-message">
        <h1>Welcome to the Movie Booking App</h1>
        <p>Sign in to access your account and start booking your favorite movies!</p>
        <p>
          Don't have an account? <Link to="/UserRegistrationForm">Click here to sign up</Link>
        </p>
        <p>
          <Link to="/RestPassword">Forgot password? Reset it here</Link>
        </p>
      </div>
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="loginId">Login ID:</label>
            <input
              type="text"
              id="loginId"
              name="loginId"
              value={credentials.loginId}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </div>
  </div>
  );
};

export default Login;
