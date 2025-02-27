import { db } from "../../../firebase";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { event, payload } = body;

    // Validate webhook event
    if (event !== "invitee.created" || !payload) {
      return NextResponse.json({ message: "Invalid event or payload" });
    }

    const { invitee } = payload;
    const event_start_time = payload.event.start_time;

    // Store in Firestore
    await db.collection("appointments").doc(invitee.uuid).set({
      meeting_id: invitee.uuid,
      patient_email: invitee.email,
      patient_name: invitee.name,
      start_time: event_start_time,
      status: "scheduled",
    });

    return NextResponse.json({ message: "Meeting stored successfully!" });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed", details: error.message },
      { status: 500 }
    );
  }
}
