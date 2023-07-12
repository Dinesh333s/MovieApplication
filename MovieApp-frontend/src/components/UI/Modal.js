import { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { useState } from 'react';

import classes from './Modal.module.css';

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

const ModalOverlay = (props) => {
  console.log(props.value)
  return (
    <div className={classes.modal}>
      <div className={classes.content}>
        {props.value.history.status  == 401 && <p>No tickets Booked</p>}
        {props.value.history.status  !== 401 &&
        <table className="table">
          <thead>
            <tr>
              <th>Login ID</th>
              <th>Movie Name</th>
              <th>Theatre Name</th>
              <th>Number of Tickets</th>
              <th>Seat Numbers</th>
            </tr>
          </thead>
          <tbody>
            {props.value.history.map((ticket) => (
              <tr key={ticket._id}>
                <td>{ticket.loginId}</td>
                <td>{ticket.movieName}</td>
                <td>{ticket.theatreName}</td>
                <td>{ticket.noOfTickets}</td>
                <td>
                  {Array.isArray(ticket.seatNumbe)
                    ? ticket.seatNumbers.join(', ')
                    : 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>}
      </div>
    </div >
  );
};

const portalElement = document.getElementById('overlays');

const Modal = (props) => {
  return (

    <Fragment>
      {console.log(props)}
      {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay value={props}></ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;