import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db } from "../../../firebase";
import { doc, getDoc } from "firebase/firestore";
import Head from "next/head";

const MeetingDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [meeting, setMeeting] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeeting = async () => {
      try {
        if (!id) return;
        const meetingRef = doc(db, "meetings", id);
        const meetingSnap = await getDoc(meetingRef);

        if (meetingSnap.exists()) {
          setMeeting({ id: meetingSnap.id, ...meetingSnap.data() });
        } else {
          setError("Meeting not found");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMeeting();
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <p className="text-danger fs-4">{error}</p>
      </div>
    );
  }

  if (!meeting) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <p className="text-warning fs-4">No meeting data available</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Meeting Details | Doctor Portal</title>
      </Head>

      <div className="container mt-5">
        <div className="card shadow-lg border border-light">
          <div className="card-header bg-primary text-white text-center py-4">
            <h3>Meeting Details</h3>
          </div>
          <div className="card-body">
            <div className="row mb-4">
              <div className="col-md-6">
                <p><strong>Meeting ID:</strong> {meeting.id}</p>
                <p><strong>Status:</strong> {meeting.status}</p>
                <p><strong>Timezone:</strong> {meeting.timezone}</p>
              </div>
            </div>

            <div className="border-top pt-4">
              <h4 className="text-primary">Questions & Answers</h4>
              <div className="mt-2">
                {meeting.questionsAndAnswers?.map((qa, index) => (
                  <div key={index} className="p-3 mb-2 border rounded bg-light">
                    <p><strong>Q:</strong> {qa.question}</p>
                    <p><strong>A:</strong> {qa.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-top pt-4">
              <h4 className="text-primary">Event Details</h4>
              {meeting.eventDetails ? (
                <div className="row mb-4">
                  <div className="col-md-6">
                    <p><strong>Event Name:</strong> {meeting.eventDetails.name}</p>
                    <p><strong>Start Time:</strong> {new Date(meeting.eventDetails.startTime.seconds * 1000).toLocaleString()}</p>
                    <p><strong>End Time:</strong> {new Date(meeting.eventDetails.endTime.seconds * 1000).toLocaleString()}</p>
                  </div>
                  <div className="col-md-6">
                    <p><strong>Join Link:</strong>{" "}
                      {meeting.eventDetails.location?.join_url ? (
                        <a
                          href={meeting.eventDetails.location.join_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary"
                        >
                          Click here to join
                        </a>
                      ) : (
                        "No link available"
                      )}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-warning">Event details not available</p>
              )}
            </div>

            <div className="border-top pt-4">
              <h4 className="text-primary">Invitee Details</h4>
              <div className="row mb-4">
                <div className="col-md-6">
                  <p><strong>Name:</strong> {meeting.inviteeName}</p>
                </div>
                <div className="col-md-6">
                  <p><strong>Email:</strong> {meeting.inviteeEmail}</p>
                </div>
              </div>
            </div>

            <div className="border-top pt-4">
              <h4 className="text-primary">Actions</h4>
              <div className="d-flex flex-wrap gap-3 mt-2">
                <a
                  href={meeting.cancelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-danger"
                >
                  Cancel Meeting
                </a>
                <a
                  href={meeting.rescheduleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  Reschedule Meeting
                </a>
                <button
                  onClick={() => router.back()}
                  className="btn btn-outline-secondary"
                >
                  Back to Meetings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MeetingDetail;
