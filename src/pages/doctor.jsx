import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { db } from '../../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../reducers/authSlice";

const DoctorPage = () => {
  const dispatch = useDispatch();
  const { data: session, status } = useSession();
  const [onlineStatus, setOnlineStatus] = useState(null);

  // Get the online status from the Redux store using useSelector
  const online = useSelector((state) => state.auth.online);

  useEffect(() => {
    if (session && session.user.role === 1) {
      fetchUserOnlineStatus(session.user.uid);
      updateUserOnlineStatus(session.user.uid, true);
    }
  }, [session]);

  useEffect(() => {
    // If online status changes in Redux, update the local onlineStatus state
    setOnlineStatus(online);
  }, [online]); // This will update whenever the Redux state for online changes

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

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Doctor Dashboard</h1>
      <p>Welcome, {session.user.email}!</p>
      <p>Status: {onlineStatus ? "Online" : "Offline"}</p>
    </div>
  );
};

export default DoctorPage;
