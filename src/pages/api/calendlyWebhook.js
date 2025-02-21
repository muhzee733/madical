import { db } from "../../../firebase";
import { collection, addDoc } from "firebase/firestore";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        const { event, payload, patientId } = req.body; // No doctorId needed

        if (event === "invitee.created") {
            const bookingData = {
                patientId,
                patientName: payload.invitee.name,
                patientEmail: payload.invitee.email,
                dateTime: payload.event.start_time,
                calendlyEventUrl: payload.event.uri,
                createdAt: new Date(),
                status: "pending", // Doctors can pick available patients
            };

            // Save appointment in Firestore
            await addDoc(collection(db, "bookings"), bookingData);

            return res.status(200).json({ message: "Booking saved successfully" });
        }

        res.status(400).json({ message: "Event type not supported" });
    } catch (error) {
        console.error("Error saving booking:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
