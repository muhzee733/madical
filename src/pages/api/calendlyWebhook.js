import { db } from "../../../firebase";
import { collection, addDoc } from "firebase/firestore";

export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        // Log incoming request body to verify the data
        console.log('Incoming Webhook Data:', req.body);

        const { event, payload } = req.body; // Extract event and payload from the request body

        // Check if the event is invitee.created
        if (event === "invitee.created") {
            // Prepare the data to save in Firestore
            const bookingData = {
                patientId: payload.invitee.email, // Using email as patientId for uniqueness
                patientName: payload.invitee.name,
                patientEmail: payload.invitee.email,
                dateTime: payload.event.start_time,
                calendlyEventUrl: payload.event.uri,
                createdAt: new Date(),
                status: "pending", // Mark as pending, doctors can pick
            };

            // Save appointment in Firestore (in 'bookings' collection)
            await addDoc(collection(db, "bookings"), bookingData);

            // Respond back to Calendly with a success message
            return res.status(200).json({ message: "Booking saved successfully" });
        }

        // Respond if the event is not supported
        res.status(400).json({ message: "Event type not supported" });
    } catch (error) {
        console.error("Error saving booking:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
