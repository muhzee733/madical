import React, { useState, useEffect } from "react";
import { db } from "../../firebase";  // Import Firebase Firestore

const Chat = ({ meetingId, userRole }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Fetch messages from Firestore
  useEffect(() => {
    const unsubscribe = db
      .collection("messages")
      .where("meetingId", "==", meetingId)
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        const messagesData = snapshot.docs.map((doc) => doc.data());
        setMessages(messagesData);
      });

    return () => unsubscribe(); // Cleanup when component unmounts
  }, [meetingId]);

  const sendMessage = async () => {
    if (newMessage.trim()) {
      await db.collection("messages").add({
        meetingId,
        from: userRole, // e.g., 'doctor' or 'patient'
        to: userRole === "doctor" ? "patient" : "doctor",
        message: newMessage,
        timestamp: new Date(),
      });
      setNewMessage(""); // Clear the input field
    }
  };

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <h3>Chat</h3>
        <div style={{ maxHeight: "300px", overflowY: "scroll" }}>
          {messages.map((msg, index) => (
            <div key={index} style={{ margin: "10px 0" }}>
              <strong>{msg.from}:</strong> {msg.message}
            </div>
          ))}
        </div>
      </div>
      <div>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message"
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
