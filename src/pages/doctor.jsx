import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { db } from "../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import Slots from "../Components/slot/slots";
import Slot from "../Components/slot";
import { setSlots } from "../reducers/slotslice";
import { setAppointments } from "../reducers/appointmentsSlice";
import { useDispatch, useSelector } from "react-redux";
import Appointments from "../Components/appointments/appointments";

const DoctorPage = () => {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const slots = useSelector((state) => state.slots.slots);
  const appointments = useSelector((state) => state.appointment.appointments);

  useEffect(() => {
    if (status === "loading") {
      return;
    }
    if (!session || session.user.role !== 1) {
      router.push("/unauthorized");
    } else {
      const fetchSlotsAndAppointments = async () => {
        setIsLoading(true);
        
        // Fetch slots
        const slotsCollection = collection(db, "slots");
        const doctorSlotsQuery = query(slotsCollection, where("doctorId", "==", session.user.uid));
        const slotsSnapshot = await getDocs(doctorSlotsQuery);
        const slotsList = slotsSnapshot.docs.map((doc) => doc.data());
        dispatch(setSlots(slotsList)); 

        // Fetch appointments
        const appointmentsCollection = collection(db, "appointments");
        const doctorAppointmentsQuery = query(
          appointmentsCollection,
          where("doctorId", "==", session.user.uid)
        );
        const appointmentsSnapshot = await getDocs(doctorAppointmentsQuery);
        const appointmentsList = appointmentsSnapshot.docs.map((doc) => doc.data());
        dispatch(setAppointments(appointmentsList)); 

        setIsLoading(false);
      };
      
      fetchSlotsAndAppointments();
    }
  }, [session, status, router, dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="row">
        <div className="col-lg-6">
          <Slots slots={slots} isLoading={isLoading} />
        </div>
        <div className="col-lg-6">
          <Appointments appointments={appointments} />
        </div>
      </div>
      <Slot doctorId={session?.user?.uid} />
    </div>
  );
};

export default DoctorPage;
