export default async function handler(req, res) {
  if (req.method !== "POST") {
      return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
      const body = req.body;
      console.log("Received webhook:", body);

      // Check the event type
      if (body.event === "invitee.created") {
          console.log("Processing invitee.created event");
          
          // Your logic to handle the event
          return res.status(200).json({ message: "Webhook received" });
      }

      return res.status(400).json({ error: "Unhandled event type" });

  } catch (error) {
      console.error("Error handling webhook:", error);
      return res.status(500).json({ error: "Internal Server Error" });
  }
}
