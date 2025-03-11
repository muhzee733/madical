import React, { useEffect, useState } from "react";
import Head from "next/head";
import { db } from "../../firebase";
import { collection, query, getDocs } from "firebase/firestore";
import { useRouter } from "next/router";
import ChatBox from "../components/chatbox";
import Navbar from "../components/navbar";

const MeetingsList = () => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chatBox, setChatBox] = useState({ open: false, patientId: null });
  const [user, setUser] = useState(null);

  const router = useRouter();
  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("doctor"));
    if (!userData || userData.role !== 1) {
      router.push("/unauthorized");
    } else {
      setUser(userData);
    }
  }, [router]);

  useEffect(() => {
    const fetchMeetings = async () => {
      if (!user) return;

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
    fetchMeetings();
  }, [user]);

  return (
    <>
      <Head>
        <title>Doctor Dashboard</title>
      </Head>
      <Navbar>
        <div className="container mt-4">
          <h2 className="text-center mb-4">Scheduled Meetings</h2>

          {loading ? (
            <p>Loading meetings...</p>
          ) : error ? (
            <p className="text-danger">{error}</p>
          ) : meetings.length === 0 ? (
            <p className="text-center">No future meetings found.</p>
          ) : (
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h4 className="card-title">Upcoming Meetings</h4>
                <a href="/appointments" className="btn btn-primary">
                  View all
                </a>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table mb-0">
                    <thead>
                      <tr>
                        <th>Patient Name</th>
                        <th>Patient Email</th>
                        <th>Status</th>
                        <th>Timezone</th>
                        <th>Chat</th>
                      </tr>
                    </thead>
                    <tbody>
                      {meetings.map((meeting) => (
                        <tr key={meeting.id} style={{ cursor: "pointer" }}>
                          <td>{meeting.inviteeName}</td>
                          <td>{meeting.inviteeEmail}</td>
                          <td>{meeting.status}</td>
                          <td>{meeting.timezone}</td>
                          <td>
                            <button
                              className="btn btn-danger"
                              onClick={() =>
                                setChatBox({
                                  open: true,
                                  patientId: meeting.patientId,
                                })
                              }
                            >
                              Chat
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
        {chatBox.open && (
          <ChatBox
            chatOpen={chatBox.open}
            patientId={chatBox.patientId}
            onClose={() => setChatBox({ open: false, patientId: null })}
          />
        )}
      </Navbar>
    </>
  );
};

export default MeetingsList;
