import React from "react";
import { Table } from "react-bootstrap";
import { format } from "date-fns";

const SlotsCalendar = ({ slots, isLoading }) => {

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Booked Slots</h3>
      {isLoading ? (
        <p>Loading Time Slots...</p>
      ) : slots.length > 0 ? (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Date</th>
              <th>Time Slots</th>
            </tr>
          </thead>
          <tbody>
            {slots.map((slot, index) => (
              <tr key={index}>
                <td>{slot.date}</td>
                <td>
                  {slot.slots.length > 0 ? (
                    slot.slots.map((time, timeIndex) => (
                      <p key={timeIndex}>{time}</p>
                    ))
                  ) : (
                    <p>No slots available</p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No slots available.</p>
      )}
    </div>
  );
};

export default SlotsCalendar;
