import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { db } from "../../../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import Swal from "sweetalert2";

// Function to generate hourly slots
const generateHourlySlots = () => {
  const startHour = 8; // Starting from 8 AM
  const slots = [];
  for (let i = startHour; i < startHour + 12; i++) {
    const slotTime = new Date().setHours(i, 0, 0, 0);
    slots.push(format(slotTime, "hh:mm a"));
  }
  return slots;
};

const Slot = ({ doctorId }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);

  const hourlySlots = generateHourlySlots();

  // Function to fetch booked slots from Firestore
  const fetchBookedSlots = async (dateStr) => {
    const slotsCollectionRef = collection(db, "slots");
    const q = query(
      slotsCollectionRef,
      where("doctorId", "==", doctorId),
      where("date", "==", dateStr)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const existingDoc = querySnapshot.docs[0];
      const bookedSlotsData = existingDoc.data().slots || [];
      const bookedSlotsObj = bookedSlotsData.map((slot) => ({
        time: slot.time,
        isBooked: slot.isBooked,
      }));
      setBookedSlots(bookedSlotsObj);
    } else {
      setBookedSlots([]);
    }
  };

  // Fetch booked slots when the selected date changes
  useEffect(() => {
    const dateStr = format(selectedDate, "yyyy-MM-dd");
    fetchBookedSlots(dateStr);
  }, [selectedDate]);

  // Handle slot click to toggle selected status
  const handleSlotClick = (slot) => {
    const isSlotSelected = selectedSlots.includes(slot);
    const updatedSlots = isSlotSelected
      ? selectedSlots.filter((s) => s !== slot)
      : [...selectedSlots, slot];

    setSelectedSlots(updatedSlots);
  };

  // Handle form submission to save selected slots
  const handleSubmit = async () => {
    if (!selectedDate || selectedSlots.length === 0) {
      Swal.fire("Error", "Please select both a date and time slot.", "error");
      return;
    }

    const dateStr = format(selectedDate, "yyyy-MM-dd");
    const slotsCollectionRef = collection(db, "slots");

    const q = query(
      slotsCollectionRef,
      where("doctorId", "==", doctorId),
      where("date", "==", dateStr)
    );
    const querySnapshot = await getDocs(q);

    try {
      const slotsWithStatus = selectedSlots.map((slot) => ({
        time: slot,
        isBooked: false, // Default value for new slots
      }));

      if (!querySnapshot.empty) {
        const existingDoc = querySnapshot.docs[0];
        const existingSlots = existingDoc.data().slots || [];
        const updatedSlots = [
          ...new Set([...existingSlots, ...slotsWithStatus]), // Merge new slots with existing ones
        ];

        await updateDoc(doc(db, "slots", existingDoc.id), {
          slots: updatedSlots,
        });

        Swal.fire("Success", "Slots updated successfully!", "success");
      } else {
        const slotData = {
          doctorId: doctorId,
          date: dateStr,
          slots: slotsWithStatus,
          isBooked: false,
          createdAt: Timestamp.now(),
        };

        await addDoc(slotsCollectionRef, slotData);

        Swal.fire("Success", "Slots added successfully!", "success");
      }

      setSelectedSlots([]); // Clear selected slots after submission
    } catch (error) {
      console.error("Error updating slots:", error);
      Swal.fire(
        "Error",
        "Failed to update slots. Please try again later.",
        "error"
      );
    }
  };

  return (
    <div className="container">
      <h4>Schedule Slots</h4>

      <div className="row">
        <div className="col-md-6">
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={(date) => setSelectedDate(date || new Date())}
            disabled={{ before: new Date() }}
          />
        </div>

        <div className="col-md-6">
          {selectedDate && (
            <div>
              <h5>Selected Date:</h5>
              <p>{format(selectedDate, "yyyy-MM-dd")}</p>

              <h5>Hourly Slots:</h5>
              <div className="row">
                {hourlySlots.map((slot) => {
                  const isBooked = bookedSlots.some(
                    (bookedSlot) => bookedSlot.time === slot
                  );
                  console.log(isBooked)
                  return (
                    <div key={slot} className="col-4 mb-2">
                      <button
                        onClick={() => handleSlotClick(slot)}
                        className={`btn w-100 ${
                          selectedSlots.includes(slot)
                            ? "bg-primary text-white"
                            : isBooked
                            ? "btn-danger"
                            : "btn-outline-primary"
                        }`}
                        disabled={isBooked}
                      >
                        {slot}
                      </button>
                    </div>
                  );
                })}
              </div>

              <p>
                Selected Slots:{" "}
                {selectedSlots.length > 0 ? selectedSlots.join(", ") : "None"}
              </p>

              <button onClick={handleSubmit} className="btn btn-success w-100">
                Add Slots Time
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Slot;
