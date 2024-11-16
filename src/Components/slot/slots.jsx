import React from 'react';

const SlotsCalendar = ({ slots }) => {
  return (
    <div className="container mt-4">
      <h3 className="mb-4">Booked Slots</h3>
      {Object.keys(slots).length > 0 ? (
        <div className="row">
          {Object.keys(slots).map((date) => (
            <div key={date} className="col-md-4 mb-3">
              <div className="card shadow-sm">
                <div className="card-header bg-primary text-white">
                  <span>Date:</span>
                  <span>    </span>
                  <span>{date}</span>
                </div>
                <div className="card-body">
                  {slots[date].length > 0 ? (
                    <ul className="list-group">
                      {slots[date].map((time, index) => (
                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                          {time}
                          <span className="badge bg-info text-white">{time}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted">No available slots for this date.</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No slots available.</p>
      )}
    </div>
  );
};

export default SlotsCalendar;
