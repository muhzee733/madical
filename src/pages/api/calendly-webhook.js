import { db } from "../../../firebase";
import { collection, addDoc } from "firebase/firestore";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { event, payload, session } = req.body;
    if (event === "invitee.created") {
      console.log(payload, 'payloadasas')
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

      // const uid = session?.user?.uid; 
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
          // uri: eventUri,
        },
        cancelUrl: cancel_url,
        rescheduleUrl: reschedule_url,
        timezone: timezone,
        status: status,
        // userUid: uid, 
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
