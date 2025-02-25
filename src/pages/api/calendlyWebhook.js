export default async function handler(req, res) {
    console.log("Received request method:", req.method);
  
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method Not Allowed" });
    }
  
    try {
      const eventData = req.body;
      console.log("Calendly Webhook Data:", eventData);
  
      return res.status(200).json({ message: "Webhook received successfully", data: eventData });
    } catch (error) {
      console.error("Error processing webhook:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  