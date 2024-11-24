import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { db } from "../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import Slots from "../Components/slot/slots";
import Slot from '../Components/slot';
import {setSlots} from '../reducers/slotslice';
import { useDispatch, useSelector } from "react-redux";

const DoctorPage = () => {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const slots = useSelector((state) => state.slots.slots);

  useEffect(() => {
    if (status === "loading") {
      return;
    }
    if (!session || session.user.role !== 1) {
      router.push("/unauthorized");
    } else {
      const fetchSlots = async () => {
        setIsLoading(true);
        const slotsCollection = collection(db, "slots");
        const doctorSlotsQuery = query(
          slotsCollection,
          where("doctorId", "==", session.user.uid)
        );
        const slotsSnapshot = await getDocs(doctorSlotsQuery);
        const slotsList = slotsSnapshot.docs.map((doc) => doc.data());
        dispatch(setSlots(slotsList))
        console.log(slotsList);
        setIsLoading(false);
      };
      fetchSlots();
    }
  }, [session, status, router,dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div>
       <Slots slots={slots} isLoading={isLoading} />
       <Slot doctorId={session?.user?.uid}/>
    </div>
  );
};

export default DoctorPage;
