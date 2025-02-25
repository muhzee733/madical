import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";

const MeetingsList = () => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
  }, [status, session, router]);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const ORGANIZATION_ID = "3e3ec62d-5360-4c21-815b-95c4c5f59588";

        const response = await axios.get(
          "https://api.calendly.com/scheduled_events",
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_NEXT_TOKKEN}`,
              "Content-Type": "application/json",
            },
            params: {
              organization: `https://api.calendly.com/organizations/${ORGANIZATION_ID}`,
            },
          }
        );

        // Get current date/time
        const now = new Date();

        // Filter and sort meetings
        const futureMeetings = response.data.collection
          .filter((meeting) => new Date(meeting.start_time) > now)
          .sort((a, b) => new Date(a.start_time) - new Date(b.start_time));

        setMeetings(futureMeetings);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMeetings();
  }, []);

  const handleLogout = async () => {
    // This will log out the user and remove the session
    await signOut({ callbackUrl: "/login" }); // You can set the desired callback URL after logout
  };

  if (loading)
    return (
      <div>
        <p>Loading meetings...</p>
      </div>
    );
  if (error)
    return (
      <div className="h-100 w-100 d-flex align-items-center justify-content-between">
        <p>{error}</p>
      </div>
    );

  return (
    <>
      <Head>
        <title>Doctor Dashboard</title>
      </Head>
      <div className="container mt-4">
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="btn btn-danger btn-sm position-absolute"
          style={{ top: "20px", right: "20px" }}
        >
          Logout
        </button>
        
        <h2 className="text-center mb-4">Scheduled Meetings</h2>
        {meetings.length === 0 ? (
          <p className="text-center">No future meetings found.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead className="thead-dark">
                <tr>
                  <th>Meeting Name</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Join Link</th>
                </tr>
              </thead>
              <tbody>
                {meetings.map((meeting) => {
                  const startDate = new Date(meeting.start_time);
                  return (
                    <tr key={meeting.uri}>
                      <td>{meeting.name}</td>
                      <td>{startDate.toLocaleDateString()}</td>
                      <td>{startDate.toLocaleTimeString()}</td>
                      <td>
                        {meeting.location?.join_url ? (
                          <a
                            href={meeting.location.join_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary btn-sm"
                          >
                            Join Meeting
                          </a>
                        ) : (
                          <span>No link available</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default MeetingsList;
