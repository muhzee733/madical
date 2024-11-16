import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { db } from "../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../reducers/authSlice";
import { setSlots } from "../reducers/slotslice";  // Import setSlots action
import Slot from "../Components/slot";
import Slots from "../Components/slot/slots";

const DoctorPage = () => {
  const dispatch = useDispatch();
  const { data: session, status } = useSession();
  const [onlineStatus, setOnlineStatus] = useState(null);
  const online = useSelector((state) => state.auth.online);
  // Get the online status from the Redux store using useSelector
  const slots = useSelector((state) => state.slots);

  useEffect(() => {
    if (session && session.user.role === 1) {
      fetchUserOnlineStatus(session.user.uid);
      updateUserOnlineStatus(session.user.uid, true);

      // Fetch and dispatch slots from Firebase for this doctor
      fetchAndDispatchSlots(session.user.uid);

      // Cleanup function to mark the user offline when the component unmounts
      return () => {
        updateUserOnlineStatus(session.user.uid, false);
      };
    }
  }, [session]);

  useEffect(() => {
    // If online status changes in Redux, update the local onlineStatus state
    setOnlineStatus(online);
  }, [online]);

  const fetchUserOnlineStatus = async (userId) => {
    try {
      const userRef = doc(db, "users", userId);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        const userData = docSnap.data();
        setOnlineStatus(userData.online);
      }
    } catch (error) {
      console.error("Error fetching online status:", error);
    }
  };

  const updateUserOnlineStatus = async (userId, isOnline) => {
    try {
      const userRef = doc(db, "users", userId);
      await setDoc(userRef, { online: isOnline }, { merge: true });
      dispatch(setUser({ online: isOnline }));
    } catch (error) {
      console.error("Error updating online status:", error);
    }
  };

  const fetchAndDispatchSlots = async (userId) => {
    try {
      const userRef = doc(db, "users", userId);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        const userData = docSnap.data();
        if (userData.slots) {
          const sortedSlots = Object.keys(userData.slots)
            .sort((a, b) => new Date(a) - new Date(b)) // Sort dates in ascending order
            .reduce((acc, date) => {
              acc[date] = userData.slots[date];
              return acc;
            }, {});
          
          dispatch(setSlots(sortedSlots)); 
        }
      }
    } catch (error) {
      console.error("Error fetching slots:", error);
    }
  };
  

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session || session.user.role !== 1) {
    return <div>Unauthorized Access</div>;
  }

  return (
    <div>
      <Slots slots={slots?.slots}/>
      <Slot userId={session.user.uid} />
    </div>
  );
};

export default DoctorPage;
