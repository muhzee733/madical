import admin from "@/firebaseAdmin"; // Firebase Admin SDK
import { NextResponse } from "next/server";

// Initialize Firestore
const db = admin.firestore();

export async function POST(req) {
  try {
    const body = await req.json();

    // Check if it's an invitee.created event
    if (body.event === "invitee.created") {
      const { invitee, event_start_time } = body.payload;

      // Store in Firebase Firestore
      await db.collection("appointments").doc(invitee.uuid).set({
        meeting_id: invitee.uuid,
        patient_email: invitee.email,
        patient_name: invitee.name,
        start_time: event_start_time,
        status: "scheduled",
      });

      return NextResponse.json({ message: "Meeting stored successfully!" });
    }

    return NextResponse.json({ message: "No action taken" });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
