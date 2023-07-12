import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MainCSS.css';
import Menu from './Menu';

const AddMovieForm = () => {

  const navigate =useNavigate();
  const [movie, setMovie] = useState({
    _id: '',
    movieName: '',
    theatreName: '',
    noOfTicketsAvailable: '',
    ticketsStatus:" "
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie((prevMovie) => ({ ...prevMovie, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = 'http://localhost:8080/api/v1.0/moviebooking/addmovie';
    const token = sessionStorage.getItem("token");

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(movie),
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${token}`
        },
      })
      if (response.status == 200) {
        alert("Ticket booked!!!");
        navigate('/AllMovie');
      }
    } catch (error) {
      console.log(error);
    };
  };


  return (
    <div>
      <Menu />
      <div className="container-fluid ">
        <h1>Add Movie</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="_id">ID:</label>
            <input
              type="text"
              className="form-control"
              id="_id"
              name="_id"
              value={movie._id}
              onChange={handleChange}
              required />
          </div>
          <div className="form-group">
            <label htmlFor="movieName">Name:</label>
            <input
              type="text"
              className="form-control"
              id="movieName"
              name="movieName"
              value={movie.movieName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="theatreName">Theatre Name:</label>
            <input
              type="text"
              className="form-control"
              id="theatreName"
              name="theatreName"
              value={movie.theatreName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="noOfTicketsAvailable">Number of Tickets:</label>
            <input
              type="text"
              className="form-control"
              id="noOfTicketsAvailable"
              name="noOfTicketsAvailable"
              value={movie.noOfTicketsAvailable}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="ticketsStatus">Tickets Status:</label>
            <input
              type="text"
              className="form-control"
              id="ticketsStatus"
              name="ticketsStatus"
              value={movie.ticketsStatus}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>

      </div>
    </div>
  );
};

export default AddMovieForm;