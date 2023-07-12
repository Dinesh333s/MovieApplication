import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import './MainCSS.css';
import { useNavigate } from 'react-router-dom';
import { getSessionRole } from '../util/util';
import Menu from './Menu'

const ListAllMovie = () => {
  const [movies, setMovies] = useState([]);
  const [tempMovie, setTempMovie] = useState([]);
  const [searchMovie, setsearchMovie] = useState([]);
  const navigate = useNavigate();

  const fetchMovies = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1.0/moviebooking/all');
      console.log(response);
      const jsonData = await response.json();
      console.log(jsonData);
      setMovies(jsonData);
      setTempMovie(jsonData);
    } catch (error) {
      console.log("Error getting movies ==> ", error);
    }
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  // --- NAVIGATING TO BOOK TICKETS ---
  const bookTicketHandler = (props) => {
    const bookMovie = {
      id: props._id,
      movieName: props.movieName,
      theatreName: props.theatreName
    }
    const encodedMovie = encodeURIComponent(JSON.stringify(bookMovie));
    navigate(`/BookTicket/${encodedMovie}`)
  }

  // --- DELETING A MOVIE ---
  const deleteMovieHandler = async (movieName) => {
    const url = `http://localhost:8080/api/v1.0/moviebooking/${movieName}/delete`
    try {
      await fetch(url, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${token}`
        },
      });
      fetchMovies();
    } catch (error) {
      console.log(error);
    }
  };

  const token = sessionStorage.getItem("token"); // gettin role from session storage
  const role = getSessionRole(); // getting role from session storage

  const changeHandler = (event) => {
    setsearchMovie(event.target.value);
    if (searchMovie.length - 1 === 0) {
      setMovies(tempMovie);
    }
  }

  // --- SEARCH MOVIE BY NAME ---
  const searchHandler = async () => {
    console.log("search clicked")
    try {
      const url = `http://localhost:8080/api/v1.0/moviebooking/movies/search/${searchMovie}`
      const response = await fetch(url, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${token}`
        }
      });
      const jsonData = await response.json();
      console.log(jsonData);
      setMovies(jsonData);
    } catch (error) { console.log("Error getting movies ==> ", error) }
  }

  return (
    <>
      <Menu />
      <div className="container-fluid">
        <h1>All Movies</h1>

        {/* --- search movie by name --- */}
        <div className='search'>
          <label>Enter the movie name to view the booking details:</label>
          <input
            type='text'
            placeholder='search'
            name='search'
            value={searchMovie}
            onChange={changeHandler}
          />
          <button onClick={searchHandler}>Search</button>
        </div>
        <div class="container">
          <h2>Available Movies in Theatre's</h2>
          <Table striped bordered hover className='table-movie'>
          <thead>
            <tr>
              <th>Movie Name</th>
              <th>Theatre Name</th>
              <th>Tickets Available</th>
              <th>Ticket Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie.movieName}>
                <td>{movie.movieName}</td>
                <td>{movie.theatreName}</td>
                <td>{movie.noOfTicketsAvailable}</td>
                <td>{movie.ticketsStatus}</td>
                {role === "user" && 
                  <td>
                    <button className="book-btn" disabled={movie.noOfTicketsAvailable==0} onClick={() => bookTicketHandler(movie)}>Book Now</button>
                  </td>
                }
                {role === "admin" &&
                  <td>
                    <Button variant="danger" onClick={() => deleteMovieHandler(movie.movieName)}>
                      Delete
                    </Button>
                  </td>
                }
              </tr>
            ))}
          </tbody>
        </Table>
        </div>
      </div>
    </>
  );
};

export default ListAllMovie;
