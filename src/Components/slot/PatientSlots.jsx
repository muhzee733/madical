import React, { useState } from "react";
import { Card, Button, Row, Col, Spinner } from "react-bootstrap";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../firebase";

const PatientSlots = ({ loading, bookedSlots, patientid }) => {
  const [loadingSlots, setLoadingSlots] = useState({});

  const isValidSlot = (slotDate) => {
    const currentDate = new Date();
    const slotDateTime = new Date(slotDate);
    currentDate.setHours(0, 0, 0, 0);
    slotDateTime.setHours(0, 0, 0, 0);

    return slotDateTime >= currentDate;
  };

  const handleBookSlot = async (slot, time) => {
    const loadingKey = `${slot.date}-${time}`;
    setLoadingSlots((prevState) => ({
      ...prevState,
      [loadingKey]: true,
    }));

    const doctorId = slot.doctorId;
    const patientId = patientid;
    const createdAt = new Date().toISOString();
    const status = "Pending";
    const slotId = slot.id;

    const slotQuery = query(
      collection(db, "slots"),
      where("doctorId", "==", doctorId),
      where("date", "==", slot.date)
    );

    const slotSnapshot = await getDocs(slotQuery);
    const slotDoc = slotSnapshot.docs[0];
    const slotData = slotDoc.data();
    const updatedSlots = slotData.slots.map((timeSlot) => {
      if (timeSlot.time === time) {
        return { ...timeSlot, isBooked: true };
      }
      return timeSlot;
    });
    await updateDoc(slotDoc.ref, {
      slots: updatedSlots,
    });

    const existingAppointmentQuery = query(
      collection(db, "appointments"),
      where("patientId", "==", patientId),
      where("date", "==", slot.date)
    );

    const existingAppointmentSnapshot = await getDocs(existingAppointmentQuery);

    try {
      if (!existingAppointmentSnapshot.empty) {
        const existingAppointmentDoc = existingAppointmentSnapshot.docs[0];
        const existingAppointmentData = existingAppointmentDoc.data();

        const existingSlots = Array.isArray(existingAppointmentData.slots)
          ? existingAppointmentData.slots
          : [];

        const updatedSlots = [...existingSlots, time];

        await updateDoc(existingAppointmentDoc.ref, {
          slots: updatedSlots,
        });
        alert("Time slot updated successfully!");
      } else {
        const appointmentData = {
          doctorId,
          patientId,
          date: slot.date,
          time,
          createdAt,
          status,
          slotId,
          slots: [time],
        };

        await addDoc(collection(db, "appointments"), appointmentData);
        alert("Appointment booked successfully!");
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Failed to book the appointment. Please try again.");
    } finally {
      setLoadingSlots((prevState) => ({
        ...prevState,
        [loadingKey]: false,
      }));
    }
  };

  return (
    <>
      {loading ? (
        <p>Loading available slots...</p>
      ) : bookedSlots && bookedSlots.length > 0 ? (
        <div className="container mt-4">
          <h3 className="mb-4">Available Time Slots</h3>
          <Row>
            {bookedSlots
              .filter((slot) => isValidSlot(slot.date))
              .map((slot) => (
                <Col key={slot.id} xs={12} sm={6} md={4} className="mb-4">
                  <TimeSlotCard
                    slot={slot}
                    onBookSlot={(time) => handleBookSlot(slot, time)}
                    loadingSlots={loadingSlots}
                  />
                </Col>
              ))}
          </Row>
        </div>
      ) : (
        <p>No slots available at the moment.</p>
      )}
    </>
  );
};

const TimeSlotCard = ({ slot, onBookSlot, loadingSlots }) => {
  return (
    <Card>
      <Card.Header className="d-flex justify-content-between align-items-center">
        <span>
          {slot.date ? new Date(slot.date).toLocaleDateString() : "N/A"}
        </span>
        <div className="text-end">
          <h5>$30</h5>
        </div>
      </Card.Header>
      <Card.Body>
        <h5>{"Unknown Doctor"}</h5>
        <p>{"Unknown Location"}</p>
        <ul className="list-unstyled">
          {slot.slots.length > 0 ? (
            slot.slots
              .filter((timeSlot) => !timeSlot.isBooked)
              .map((timeSlot, index) => {
                console.log(timeSlot, 'timeSlot')
                const loadingKey = `${slot.date}-${timeSlot.time}`;
                const isLoading = loadingSlots[loadingKey];
                return (
                  <li
                    key={index}
                    className="d-flex justify-content-between align-items-center mb-2"
                  >
                    <span>{timeSlot.time}</span>
                    <Button
                      variant="primary"
                      size="sm"
                      disabled={isLoading}
                      onClick={() => onBookSlot(timeSlot.time)}
                    >
                      {isLoading ? (
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                      ) : (
                        "Book"
                      )}
                    </Button>
                  </li>
                );
              })
          ) : (
            <li>No available times for this date.</li>
          )}
        </ul>
      </Card.Body>
    </Card>
  );
};

export default PatientSlots;
