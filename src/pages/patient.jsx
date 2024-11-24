import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { setPatientSlots } from "../reducers/patientSlice";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import PatientSlots from "../Components/slot/PatientSlots";

const Patient = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const dispatch = useDispatch();
  const bookedSlots = useSelector((state) => state.patient.slots);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") {
      return;
    }

    if (!session || session.user.role !== 2) {
      router.push("/unauthorized");
      return;
    }

    // Fetch available time slots
    const fetchSlots = async () => {
      try {
        setLoading(true);
        const slotsCollection = collection(db, "slots");
        const slotsSnapshot = await getDocs(slotsCollection);
        const slotsList = slotsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        dispatch(setPatientSlots(slotsList));
      } catch (error) {
        console.error("Error fetching slots:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSlots();

  }, [status, session, router, dispatch]);

  return (
    <div className="container">
      <h1>Book Slot To Meet Doctor!</h1>
      <PatientSlots bookedSlots={bookedSlots} patientid={session.user?.uid}/>
    </div>
  );
};

export default Patient;
