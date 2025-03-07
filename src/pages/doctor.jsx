import React, { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Head from "next/head";
import { db } from "../../firebase";
import { collection, query, getDocs } from "firebase/firestore";
import { useRouter } from "next/router";

const MeetingsList = () => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleRowClick = (meetingId) => {
    router.push(`/meetings/${meetingId}`);
  };

  // Handle logout
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  // Effect to fetch meetings only when session is valid
  useEffect(() => {
    if (status === "loading") return; // If the session is still loading, don't proceed

    if (session.user.role !== 1) {
      router.push("/unauthorized"); // Redirect if session is not available or role is not 1 (doctor)
      return;
    }

    const fetchMeetings = async () => {
      try {
        const meetingsRef = collection(db, "meetings");
        const q = query(meetingsRef);
        const querySnapshot = await getDocs(q);
        const meetingsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setMeetings(meetingsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // Fetch meetings when session is available
    if (session) {
      fetchMeetings();
    }
  }, [session, status, router]);

  if (status === "loading") return <p>Loading authentication...</p>;

  if (!session) return <p>You must be logged in to access this page.</p>;

  return (
    <>
      <Head>
        <title>Doctor Dashboard</title>
      </Head>
      <div className="container mt-4">
        <button
          onClick={handleLogout}
          className="btn btn-danger btn-sm position-absolute"
          style={{ top: "20px", right: "20px" }}
        >
          Logout
        </button>

        <h2 className="text-center mb-4">Scheduled Meetings</h2>
        {loading ? (
          <p>Loading meetings...</p>
        ) : error ? (
          <p className="text-danger">{error}</p>
        ) : meetings.length === 0 ? (
          <p className="text-center">No future meetings found.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead className="thead-dark">
                <tr>
                  <th>Meeting ID</th>
                  <th>Patient Name</th>
                  <th>Patient Email</th>
                  <th>Status</th>
                  <th>Timezone</th>
                </tr>
              </thead>
              <tbody>
                {meetings.map((meeting) => (
                  <tr
                    key={meeting.id}
                    onClick={() => handleRowClick(meeting.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <td>{meeting.id}</td>
                    <td>{meeting.inviteeName}</td>
                    <td>{meeting.inviteeEmail}</td>
                    <td>{meeting.status}</td>
                    <td>{meeting.timezone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default MeetingsList;
