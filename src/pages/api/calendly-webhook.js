import { db } from "../../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  console.log(req, "req");
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const userId = session.user.uid;
  console.log(userId);
  try {
    const { event, payload } = req.body;
    console.log(req.body, "req.body");
    if (event === "invitee.created") {
      const {
        email,
        name,
        questions_and_answers,
        scheduled_event,
        cancel_url,
        reschedule_url,
        timezone,
        status,
      } = payload;
      const {
        created_at,
        start_time,
        end_time,
        location,
        name: eventName,
        uri: eventUri,
      } = scheduled_event;

      await addDoc(collection(db, "meetings"), {
        eventType: event,
        createdAt: new Date(created_at),
        inviteeEmail: email,
        inviteeName: name,
        questionsAndAnswers: questions_and_answers,
        eventDetails: {
          name: eventName,
          startTime: new Date(start_time),
          endTime: new Date(end_time),
          location: location,
        },
        cancelUrl: cancel_url,
        rescheduleUrl: reschedule_url,
        timezone: timezone,
        status: status,
        userId: userId,
      });
    }

    res
      .status(200)
      .json({ success: true, message: "Data stored successfully" });
  } catch (error) {
    console.error("Error storing meeting:", error);
    res.status(500).json({ success: false, error: error.message });
  }
}
