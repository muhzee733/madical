import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { db } from "../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../reducers/authSlice";
import { setSlots } from "../reducers/slotslice";
import Slot from "../Components/slot";
import Slots from "../Components/slot/slots";

const DoctorPage = () => {
  const dispatch = useDispatch();
  const { data: session, status } = useSession();
  const [onlineStatus, setOnlineStatus] = useState(null);
  const online = useSelector((state) => state.auth.online);
  const slots = useSelector((state) => state.slots.slots);

  // Fetch and dispatch slots from Redux whenever they change
  useEffect(() => {
    if (session && session.user.role === 1) {
      fetchUserOnlineStatus(session.user.uid);
      updateUserOnlineStatus(session.user.uid, true);
      fetchAndDispatchSlots(session.user.uid);

      return () => {
        updateUserOnlineStatus(session.user.uid, false);
      };
    }
  }, [session]);

  // When online status changes, update local state
  useEffect(() => {
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
            .sort((a, b) => new Date(a) - new Date(b))
            .reduce((acc, date) => {
              acc[date] = userData.slots[date];
              return acc;
            }, {});
            console.log(sortedSlots, 'sortedSlots')
          dispatch(setSlots(sortedSlots));
        }
      }
    } catch (error) {
      console.error("Error fetching slots:", error);
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
      {/* Pass the updated slots from Redux to the Slots component */}
      <Slots slots={slots} />
      <Slot userId={session.user.uid} />
    </div>
  );
};

export default DoctorPage;
