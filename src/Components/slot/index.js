import React, { useState, useEffect } from "react";
import { format, setHours, setMinutes, startOfDay } from "date-fns";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { setSlots } from "../../reducers/slotslice";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { db } from "../../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const generateHourlySlots = () => {
  const startHour = 8;
  const slots = [];
  for (let i = startHour; i < startHour + 12; i++) {
    const slotTime = setHours(setMinutes(startOfDay(new Date()), 0), i);
    slots.push(format(slotTime, "hh:mm a"));
  }
  return slots;
};

const Slot = ({ userId }) => {
  const dispatch = useDispatch();
  const slots = useSelector((state) => state.slots.slots);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);

  const hourlySlots = generateHourlySlots();

  useEffect(() => {
    const dateStr = format(selectedDate, "yyyy-MM-dd");
    const existingSlots = slots[dateStr] || [];
    setBookedSlots(existingSlots);
  }, [selectedDate, slots]);

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
      const userData = docSnap.exists() ? docSnap.data() : {};
      const updatedSlots = {
        ...userData.slots,
        [dateStr]: [...new Set([...bookedSlots, ...selectedSlots])],
      };
      dispatch(setSlots(updatedSlots));
      await setDoc(userRef, { slots: updatedSlots }, { merge: true })

      Swal.fire("Success", "Slots updated successfully!", "success");
      setSelectedSlots([]);
      setBookedSlots(updatedSlots[dateStr]);
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
            modifiers={{ highlighted: selectedDate }}
            modifiersClassNames={{ highlighted: "rdp-selected" }}
          />
        </div>

        <div className="col-md-6">
          {selectedDate && (
            <div>
              <h5>Selected Date:</h5>
              <p>{format(selectedDate, "yyyy-MM-dd")}</p>

              <h5>Hourly Slots:</h5>
              <div className="row">
                <>
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
                </>
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
        </div>
      </div>
    </div>
  );
};

export default Slot;
