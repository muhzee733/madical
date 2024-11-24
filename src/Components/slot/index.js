import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { db } from "../../../firebase";
import { collection, query, where, getDocs, updateDoc, doc, addDoc, Timestamp } from "firebase/firestore";
import Swal from "sweetalert2";

const generateHourlySlots = () => {
  const startHour = 8;
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

  const fetchBookedSlots = async (dateStr) => {
    const slotsCollectionRef = collection(db, "slots");
    const q = query(slotsCollectionRef, where("doctorId", "==", doctorId), where("date", "==", dateStr));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const existingDoc = querySnapshot.docs[0];
      setBookedSlots(existingDoc.data().slots || []);
    } else {
      setBookedSlots([]);
    }
  };

  useEffect(() => {
    const dateStr = format(selectedDate, "yyyy-MM-dd");
    fetchBookedSlots(dateStr);
  }, [selectedDate]);

  const handleSlotClick = (slot) => {
    const isSlotSelected = selectedSlots.includes(slot);
    const updatedSlots = isSlotSelected
      ? selectedSlots.filter((s) => s !== slot)
      : [...selectedSlots, slot];

    setSelectedSlots(updatedSlots);
  };

  const handleSubmit = async () => {
    if (!selectedDate || selectedSlots.length === 0) {
      Swal.fire("Error", "Please select both a date and time slot.", "error");
      return;
    }

    const dateStr = format(selectedDate, "yyyy-MM-dd");
    const slotsCollectionRef = collection(db, "slots");
    
    const q = query(slotsCollectionRef, where("doctorId", "==", doctorId), where("date", "==", dateStr));
    const querySnapshot = await getDocs(q);

    try {
      if (!querySnapshot.empty) {
        const existingDoc = querySnapshot.docs[0];
        const existingSlots = existingDoc.data().slots || [];
        const updatedSlots = [...new Set([...existingSlots, ...selectedSlots])];

        await updateDoc(doc(db, "slots", existingDoc.id), { slots: updatedSlots });

        Swal.fire("Success", "Slots updated successfully!", "success");
      } else {
        const slotData = {
          doctorId: doctorId,
          date: dateStr,
          slots: selectedSlots,
          isBooked: false,
          createdAt: Timestamp.now()
        };

        await addDoc(slotsCollectionRef, slotData);

        Swal.fire("Success", "Slots added successfully!", "success");
      }

      setSelectedSlots([]);
    } catch (error) {
      console.error("Error updating slots:", error);
      Swal.fire("Error", "Failed to update slots. Please try again later.", "error");
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
                {hourlySlots.map((slot) => (
                  <div key={slot} className="col-4 mb-2">
                    <button
                      onClick={() => handleSlotClick(slot)}
                      className={`btn w-100 ${
                        selectedSlots.includes(slot)
                          ? "bg-primary text-white"
                          : bookedSlots.includes(slot)
                          ? "btn-danger"
                          : "btn-outline-primary"
                      }`}
                      disabled={bookedSlots.includes(slot)}
                    >
                      {slot}
                    </button>
                  </div>
                ))}
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
