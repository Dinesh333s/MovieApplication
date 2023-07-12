
<ul class="responsive-table">
            <li class="table-header">
              <div class="col col-1">Movie Name</div>
              <div class="col col-2">Theatre Name</div>
              <div class="col col-3">Tickets Available</div>
              <div class="col col-4">Ticket Status</div>
              <div class="col col-5">Action</div>
            </li>
            {
              movies.map((movie) => (
                <li class="table-row" key={movie.movieName}>
                  <div class="col col-1">{movie.movieName}</div>
                  <div class="col col-2">{movie.theatreName}</div>
                  <div class="col col-3">{movie.noOfTicketsAvailable}</div>
                  <div class="col col-4">{movie.ticketsStatus}</div>
                  {role === "user" &&
                    <div class="col col-5">
                      <button className="book-btn" onClick={() => bookTicketHandler(movie)}>Book Now</button>
                    </div>
                  }
                  {role === "admin" &&
                    <div class="col col-5">
                      <Button variant="danger" onClick={() => deleteMovieHandler(movie.movieName)}>
                        Delete
                      </Button>
                    </div>
                  }
                </li>
              ))
            }

          </ul>


