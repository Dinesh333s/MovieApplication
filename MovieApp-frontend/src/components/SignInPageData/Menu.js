import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Menus.css';
import { getSessionRole, isLoggedIn } from '../util/util';

const Menu = () => {

  const role = getSessionRole();

  const menuAdminOption = (
    <>
      <li className="nav-item">
        <Link className="nav-link nav-button" to="/AddMovieForm">Add Movie</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link nav-button" to="/AllTicket">Bookings</Link>
      </li>
    </>
  )

  return (
    <>
      { isLoggedIn()  && 
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <Link className="navbar-brand" to="/">MovieBook App</Link>
            <div className="collapse navbar-collapse" id="navbarNav">

              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link nav-button" to="/Home">Home</Link>
                </li>

                {role == "admin" && menuAdminOption}

                <li className="nav-item">
                  <Link className="nav-link nav-button" to="/AllMovie">Movies List</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link nav-button" to="/Logout">Logout</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      }
    </>

  );
};

export default Menu;
