import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLoginIdChange = (event) => {
    setLoginId(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const credentials ={
    loginId,
    password
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .put(`http://localhost:8080/api/v1.0/moviebooking/${loginId}/forgot`,credentials )
      .then((response) => {
        console.log(response.data);
        if(response.status ==200){
          alert('Password reset successfully.');
          navigate('/');
        }        
      })
      .catch((error) => {
        console.error(error.response.data);
        setMessage('User not found.');
      });
  };

  return (
    <div className="resetPassword-container">
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="loginId">Login ID:</label>
          <input
            type="text"
            id="loginId"
            value={loginId}
            onChange={handleLoginIdChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">New Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Reset Password
        </button>
      </form>
    </div>
  );
}

export default App;
