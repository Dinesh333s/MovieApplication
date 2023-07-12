import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './MainCSS.css';
import Menu from './Menu'

const BookTicket = () => {

  const navigate = useNavigate();

  const { encodedMovie } = useParams();
  const decodedMovie = JSON.parse(decodeURIComponent(encodedMovie));

  const [ticket, setTicket] = useState({
    _id: '',
    loginId: sessionStorage.getItem("login"),
    movieName: '',
    theatreName: '',
    noOfTickets: 0,
    seatNumber: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "seatNumber") {
      const seatNumbers = value.split(",").map((num) => num.trim()); // Split the input string and trim whitespace
      setTicket((prevTicket) => ({ ...prevTicket, [name]: seatNumbers }));
    } else {
      setTicket((prevTicket) => ({ ...prevTicket, [name]: value }));
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `http://localhost:8080/api/v1.0/moviebooking/${ticket.movieName}/add`
    const token = sessionStorage.getItem("token");

    try{
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(ticket),
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${token}`
        },        
      })

      if(response.status ==200){
        alert("Ticket booked!!!");
        navigate('/Home');
      }
      if(response.status == 404){
        alert("Seat is already booked")
      }
    }catch(error)  {
        console.log(error);        
      };
  };

  return (
    <>
      <Menu />
    <div className="book-ticket">
      <h2>Fill the Ticket Details!</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="id">ID:</label>
          <input
            type="text"
            className="form-control"
            id="id"
            name="id"
            value={ticket._id = decodedMovie.id}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="movieId">Movie Name:</label>
          <input
            type="text"
            className="form-control"
            id="movieId"
            name="movieName"
            value={ticket.movieName = decodedMovie.movieName}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="theatreName">Theatre Name:</label>
          <input
            type="text"
            className="form-control"
            id="theatreName"
            name="theatreName"
            value={ticket.theatreName = decodedMovie.theatreName}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="numTickets">Number of Tickets:</label>
          <input
            type="number"
            className="form-control"
            id="noOfTickets"
            name="noOfTickets"
            value={ticket.noOfTickets}
            min={1}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="seatNumber">Seat Numbers:</label>
          <input
            type="text"
            className="form-control"
            id="seatNumber"
            name="seatNumber"
            value={ticket.seatNumber}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary button-style">Add Ticket</button>
      </form>
      <Link className="btn btn-primary button-style-back" to="/AllMovie">Back</Link>
    </div>
  </>
  );
};

export default BookTicket;
