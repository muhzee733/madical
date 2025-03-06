import { db } from "../../../firebase";
import { collection, addDoc } from "firebase/firestore";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { event, payload, session } = req.body;

    if (event === "invitee.created") {
      const {
        email,
        name,
        questions_and_answers = [],
        cancel_url,
        reschedule_url,
        timezone,
        status,
      } = payload;

      // Ensure event is present in payload
      if (!payload.event) {
        return res.status(400).json({ success: false, error: "Missing event URL in payload" });
      }

      // Fetch event details from Calendly API
      const eventResponse = await fetch(payload.event, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer YOUR_CALENDLY_API_KEY`
        }
      });

      if (!eventResponse.ok) {
        throw new Error("Failed to fetch event details from Calendly");
      }

      const eventData = await eventResponse.json();
      const scheduled_event = eventData.resource; // Adjust based on Calendly response structure

      // Extract event details safely
      const {
        created_at,
        start_time,
        end_time,
        location,
        name: eventName,
        uri: eventUri,
      } = scheduled_event || {}; 

      const uid = session?.user?.uid;

      // Store in Firebase
      await addDoc(collection(db, "meetings"), {
        eventType: event,
        createdAt: created_at ? new Date(created_at) : new Date(),
        inviteeEmail: email,
        inviteeName: name,
        questionsAndAnswers: questions_and_answers,
        eventDetails: {
          name: eventName || "Unknown Event",
          startTime: start_time ? new Date(start_time) : null,
          endTime: end_time ? new Date(end_time) : null,
          location: location || "Not specified",
          uri: eventUri || payload.event,
        },
        cancelUrl: cancel_url,
        rescheduleUrl: reschedule_url,
        timezone: timezone,
        status: status,
        userUid: uid,
      });
    }

    res.status(200).json({ success: true, message: "Data stored successfully" });
  } catch (error) {
    console.error("Error storing meeting:", error);
    res.status(500).json({ success: false, error: error.message });
  }
}
