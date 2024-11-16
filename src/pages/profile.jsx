import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useSession } from "next-auth/react";
import Layout from "../Components/Layout/Layout";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearUser } from "../reducers/authSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { data: session, status } = useSession();
  
  const userData = useSelector((state) => state.auth.userData);


  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "authenticated" && session?.user?.uid) {
      const fetchUserProfile = async () => {
        try {
          const userRef = doc(db, "users", session.user.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            const userData = userSnap.data();
            setProfileData(userData);
            dispatch(setUser({
              userData: userData,
            }));
          } else {
            setError("No such user found in the database.");
            console.log("No such user!");
          }
        } catch (error) {
          setError("Error fetching user profile.");
          console.error("Error fetching user profile:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchUserProfile();
    } else {
      setLoading(false);
      dispatch(clearUser()); // Dispatch clearUser when the user is not authenticated
    }
  }, [status, session, dispatch]);

  if (loading) {
    return <Layout>Loading...</Layout>;
  }

  if (error) {
    return <Layout>{error}</Layout>;
  }

  if (!userData) {
    return <Layout>No profile data available</Layout>;
  }

  return (
    <>
      <Head>
        <title>User Profile</title>
      </Head>
      <Layout>
        <div className="container mt-4">
          <h2>User Profile</h2>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="form-control"
              value={userData.firstName || profileData.firstName}
              readOnly
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="form-control"
              value={userData.lastName || profileData.lastName}
              readOnly
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={userData.email || profileData.email}
              readOnly
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              className="form-control"
              value={userData.phone || profileData.phone}
              readOnly
            />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Profile;
