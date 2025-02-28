import { getFirestore, collection, addDoc } from "firebase/firestore";

const db = getFirestore();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { event, payload } = req.body;

    if (event === "invitee.created") {
      const patientId = payload.invitee.email; // Adjust according to your logic
      const meetingData = {
        event_type: payload.event_type.name,
        start_time: payload.event.start_time,
        end_time: payload.event.end_time,
        invitee_email: payload.invitee.email,
        calendly_event_id: payload.event.uri,
        created_at: new Date(),
        patient_id: patientId, // Store patient ID from session or Firebase
      };

      // Save to Firestore
      await addDoc(collection(db, "meetings"), meetingData);
      return res.status(200).json({ success: true, data: meetingData });
    }

    return res.status(400).json({ error: "Unhandled event type" });
  } catch (error) {
    console.error("Error storing Calendly meeting:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
