import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { setSlots } from "../reducers/slotslice";
import Slot from "../Components/slot";
import Slots from "../Components/slot/slots";

const DoctorPage = () => {
  const dispatch = useDispatch();
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true); // Loading state for slots
  const slots = useSelector((state) => state.slots.slots);

  // Fetch and dispatch slots from Redux whenever they change
  useEffect(() => {
    if (session && session.user.role === 1) {
      fetchAndDispatchSlots(session.user.uid);
    }
  }, [session]);

  const fetchAndDispatchSlots = async (userId) => {
    try {
      const userRef = doc(db, "users", userId);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        const userData = docSnap.data();
        if (userData.slots) {
          const sortedSlots = Object.keys(userData.slots)
            .sort((a, b) => new Date(a) - new Date(b))
            .reduce((acc, date) => {
              acc[date] = userData.slots[date];
              return acc;
            }, {});
          dispatch(setSlots(sortedSlots));
        }
      }
      setIsLoading(false); // Once slots are fetched, set loading to false
    } catch (error) {
      console.error("Error fetching slots:", error);
      setIsLoading(false); // Set loading to false even if there is an error
    }
  };

  // Ensure the component only renders after session is loaded
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  // Ensure the user has the correct role
  if (!session || session.user.role !== 1) {
    return <div>Unauthorized Access</div>;
  }

  return (
    <div>
      {isLoading ? (
        <div>Loading slots...</div> // Show loading indicator for slots
      ) : (
        <>
          {/* Pass the updated slots from Redux to the Slots component */}
          <Slots slots={slots} />
          <Slot userId={session.user.uid} />
        </>
      )}
    </div>
  );
};

export default DoctorPage;
