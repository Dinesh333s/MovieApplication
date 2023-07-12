import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';


import UserRegistrationForm from './components/LoginPage/UserRegistrationForm.js';
import './components/LoginPage/UserRegistrationForm.css';
import Login from './components/LoginPage/Login.js';
import RestPassword from './components/LoginPage/RestPassword.js';
import Home from './components/SignInPageData/Home.js';
import BookingHistory from './components/SignInPageData/BookingHistory.js';
import ListAllMovie from './components/SignInPageData/ListAllMovie.js';
import AddMovieForm from './components/SignInPageData/AddMovieForm.js';
import BookTicket from './components/SignInPageData/BookTicket.js';
import Logout from './components/LoginPage/Logout.js';
import RootLayout from './components/Page/RootLayout.js';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Login /> },
      {
        path: 'Home', element: <Home />,
      },
      {
        path: 'AllMovie', element: <ListAllMovie />,
      },
      {
        path: 'UserRegistrationForm', element: <UserRegistrationForm />,
      },
      {
        path: 'RestPassword', element: <RestPassword />,
      },
      {
        path: 'AllTicket', element: <BookingHistory />,
      },
      {
        path: 'AddMovieForm', element: <AddMovieForm />,
      },
      {
        path: `BookTicket/:encodedMovie`, element: <BookTicket />,
      },
      {
        path: 'Logout', element: <Logout />,
      },
    ]
  }

])

// dummy
function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />;
    </div>
  );
}

export default App;
