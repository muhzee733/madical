import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { setPatientSlots } from "../reducers/patientSlice";
import dayjs from "dayjs";

const Patient = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const dispatch = useDispatch();
  const bookedSlots = useSelector((state) => state.patient.slots);

  useEffect(() => {
    if (status === "loading") {
      return;
    }

    if (!session || session.user.role !== 2) {
      router.push("/unauthorized");
      return;
    }

    const fetchSlots = async () => {
      try {
        const usersRef = collection(db, "users");
        const querySnapshot = await getDocs(usersRef);

        const allSlots = {};
        const currentDate = dayjs();

        querySnapshot.forEach((docSnap) => {
          const userData = docSnap.data();
          if (userData.role === 1) {
            const validSlots = {};

            // Filter out past dates and collect slots
            Object.entries(userData.slots).forEach(([date, slots]) => {
              if (dayjs(date).isAfter(currentDate)) {
                validSlots[date] = slots;
              }
            });

            // Merge valid slots for all doctors
            Object.assign(allSlots, validSlots);
          }
        });

        // Sort slots date-wise
        const sortedSlots = Object.keys(allSlots)
          .sort((a, b) => new Date(a) - new Date(b))
          .reduce((acc, date) => {
            acc[date] = allSlots[date];
            return acc;
          }, {});

        dispatch(setPatientSlots(sortedSlots));
      } catch (error) {
        console.error("Error fetching slots:", error);
      }
    };

    fetchSlots();
  }, [status, session, router, dispatch]);

  const handleBookSlot = (date, time) => {
    console.log(`Booking slot for ${date} at ${time}`);
    // Add booking logic here
  };

  return (
    <div className="container mt-5">
      <h1>Patient Dashboard</h1>
      {bookedSlots && Object.keys(bookedSlots).length > 0 ? (
        <div className="row">
          {Object.entries(bookedSlots).map(([date, slots]) => (
            <div key={date} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{date}</h5>
                  <ul className="list-group list-group-flush">
                    {slots.map((slot, index) => (
                      <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                        {slot}
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => handleBookSlot(date, slot)}
                        >
                          Book
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No available slots.</p>
      )}
    </div>
  );
};

export default Patient;
