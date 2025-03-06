// components/SendWebhook.js
import React, { useEffect, useState } from "react";

const SendWebhook = () => {
  const sendToCalendlyWebhook = async () => {
    // Retrieve UID from localStorage
    const uid = localStorage.getItem("userUID");

    if (!uid) {
      console.error("User UID not found in localStorage.");
      return;
    }

    // Prepare the webhook data
    const webhookData = {
      event: "invitee.created",
      payload: {
        email: "user@example.com",
        name: "John Doe",
        questions_and_answers: [],
        scheduled_event: {
          created_at: "2023-10-01",
          start_time: "2023-10-01T12:00:00Z",
          end_time: "2023-10-01T13:00:00Z",
          location: "Online",
          name: "Event Name",
          uri: "event-uri",
        },
        cancel_url: "https://example.com/cancel",
        reschedule_url: "https://example.com/reschedule",
        timezone: "UTC",
        status: "confirmed",
      },
      uid: uid,
    };

    // Send the request to the API route
    const response = await fetch("/api/calendly-webhook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(webhookData),
    });

    const data = await response.json();
    if (response.ok) {
      console.log("Webhook response:", data);
    } else {
      console.error("Error sending webhook:", data);
    }
  };

  return (
    <div>
      <button onClick={sendToCalendlyWebhook}>Send Calendly Webhook</button>
    </div>
  );
};

export default SendWebhook;
