import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Menus.css';
import './MainCSS.css';
import './BookingHistory.css'
import Modal from '../UI/Modal';
import Menu from './Menu'

const BookingHistory = () => {

  const [ticketsDetails, setTicketsDetails] = useState([]);
  const [movieName, setMovieName] = useState("");
  const [value, setValue] = useState(false);

  const closeHandler = () => {
    setValue(false);
  };

  const searchHandler = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const url = `http://localhost:8080/api/v1.0/moviebooking/getallbookedtickets/${movieName}`
      const response = await fetch(url, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${token}`
        }
      });
      console.log(response);
      const jsonData = await response.json();
      console.log(jsonData);
      setTicketsDetails(jsonData);
      setValue(true)
    } catch (error) {
      console.log("Error getting movies ==> ", error);
    }
  }

  const changeHandler = (event) => {
    setMovieName(event.target.value);
  }


  return (
    <>
      <Menu />
      <div className="container-fluid">
        <h1>Ticket List</h1>
        <div className='c-formContainer'>
          <label>Enter the movie name to view the booking details:</label>
          <input
            className='c-form__input'
            type='text'
            placeholder='search'
            name='search'
            value={movieName}
            onChange={changeHandler}
          />
          <button className='c-form__input' onClick={searchHandler}>Search</button>
        </div>
        {value && <Modal history={ticketsDetails} onClose={closeHandler} />}
      </div>
    </>


  );
};

export default BookingHistory;
