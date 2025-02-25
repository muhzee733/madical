import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: "Authorization code is missing" });
  }

  try {
    const response = await axios.post("https://auth.calendly.com/oauth/token", {
      grant_type: "authorization_code",
      client_id: process.env.NEXT_PUBLIC_CALENDLY_CLIENT_ID,
      client_secret: process.env.NEXT_PUBLIC_CALENDLY_CLIENT_SECRET,
      redirect_uri: "http://localhost:3000/api/auth/callback",
      code,
    });

    console.log(response.data, 'data')

    const { access_token } = response.data;

    if (access_token) {
      res.setHeader(
        "Set-Cookie",
        `calendly_token=${access_token}; Path=/; HttpOnly; Secure; SameSite=Strict`
      );

      return res.redirect("/patient");
    }
  } catch (error) {
    console.error("Calendly OAuth Error:", error.response?.data || error);
    return res.status(500).json({ error: "Failed to authenticate with Calendly" });
  }
}
