import React, { useState, useEffect } from "react";
import { addDays, format, setHours, setMinutes, startOfDay } from "date-fns";
import { db } from "../../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { setSlots } from "../../reducers/slotslice";

const Slot = ({ userId }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const dispatch = useDispatch();

  const tomorrow = addDays(new Date(), 1);

  const generateHourlySlots = () => {
    const startHour = 8;
    const slots = [];
    for (let i = startHour; i < startHour + 12; i++) {
      const slotTime = setHours(setMinutes(startOfDay(new Date()), 0), i);
      slots.push(format(slotTime, "hh:mm a"));
    }
    return slots;
  };

  const hourlySlots = generateHourlySlots();

  const fetchBookedSlots = async (date) => {
    try {
      const dateStr = format(date, "yyyy-MM-dd");
      const userRef = doc(db, "users", userId);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        if (userData.slots && userData.slots[dateStr]) {
          setBookedSlots(userData.slots[dateStr]);
        } else {
          setBookedSlots([]);
        }
      }
    } catch (error) {
      console.error("Error fetching booked slots:", error);
    }
  };

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
  
    try {
      const userRef = doc(db, "users", userId);
      const dateStr = format(selectedDate, "yyyy-MM-dd");
  
      const docSnap = await getDoc(userRef);
      let userData = {};
  
      if (docSnap.exists()) {
        userData = docSnap.data();
      }
  
      // Get the existing slots for the selected date
      const existingSlots = userData.slots ? userData.slots[dateStr] || [] : [];
  
      // Merge the new selected slots with the existing ones
      const updatedSlots = {
        ...userData.slots,
        [dateStr]: [...new Set([...existingSlots, ...selectedSlots])], // Merge and remove duplicates
      };
  
      await setDoc(
        userRef,
        {
          slots: updatedSlots,
        },
        { merge: true }
      );
  
      // Dispatch updated slots to Redux to trigger UI update in the `Slots` component
      dispatch(setSlots(updatedSlots));
  
      Swal.fire("Success", "Slots updated successfully!", "success");
      setSelectedDate(null);
      setSelectedSlots([]);
    } catch (error) {
      console.error("Error updating slots:", error);
      Swal.fire("Error", "Failed to update slots. Please try again later.", "error");
    }
  };
  

  useEffect(() => {
    if (selectedDate) {
      fetchBookedSlots(selectedDate);
    }
  }, [selectedDate]);

  return (
    <div className="container">
      <h4>Schedule Slots</h4>

      <div className="row">
        <div className="col-md-6">
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            disabled={{ before: tomorrow }}
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
                      disabled={bookedSlots.includes(slot)}
                      className={`btn w-100 ${
                        bookedSlots.includes(slot)
                          ? "btn-danger"
                          : selectedSlots.includes(slot)
                          ? "bg-primary text-white"
                          : "btn-outline-primary"
                      }`}
                    >
                      {bookedSlots.includes(slot) ? "Booked" : slot}
                    </button>
                  </div>
                ))}
              </div>

              {bookedSlots.length === 0 && (
                <div className="alert alert-info">
                  No booked slots for the selected date.
                </div>
              )}

              <p>
                Selected Slots:{" "}
                {selectedSlots.length > 0 ? selectedSlots.join(", ") : "None"}
              </p>

              <button onClick={handleSubmit} className="btn btn-success w-100">
                Add Slots
              </button>
            </div>
          )}

          {!selectedDate && (
            <p>Please select a date to view available slots.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Slot;
