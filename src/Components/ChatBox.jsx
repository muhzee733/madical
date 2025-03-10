import React, { useState, useEffect } from "react";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase";

const ChatBox = ({ chatOpen, onClose, patientId }) => {
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("doctor"));
    setUser(storedUser);
    if (storedUser) {
      setDoctorId(storedUser._id);
    }

    if (!doctorId || !patientId) return;

    const chatDocRef = doc(db, "messages", `${doctorId}_${patientId}`);

    const unsubscribe = onSnapshot(chatDocRef, (docSnap) => {
      if (docSnap.exists()) {
        setChatMessages(docSnap.data().messages || []);
      } else {
        setChatMessages([]);
      }
    });

    return () => unsubscribe();
  }, [doctorId, patientId]);

  const handleSendMessage = async (message) => {
    if (!message.trim()) return;

    const chatDocRef = doc(db, "messages", `${doctorId}_${patientId}`);

    try {
      const chatDocSnap = await getDoc(chatDocRef);
      const newMsg = {
        senderId: doctorId,
        displayName: user?.name || "Doctor",
        text: message,
        timestamp: new Date(), // Firestore timestamp issue fix
      };

      if (chatDocSnap.exists()) {
        await updateDoc(chatDocRef, {
          messages: arrayUnion(newMsg),
        });
      } else {
        await setDoc(chatDocRef, {
          doctorId,
          patientId,
          messages: [newMsg],
        });
      }

      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "";
    const date =
      timestamp.toDate?.() ?? // Firestore Timestamp
      new Date(timestamp); // Fallback if stored as Date
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  if (!chatOpen) return null;

  return (
    <div className="chat-box">
      <div className="chat-header">
        <strong>Chat</strong>
        <button className="close-chat" onClick={onClose}>✖</button>
      </div>

      <div className="chat-body">
        {chatMessages.length === 0 ? (
          <div className="text-center">
            <p>No messages yet.</p>
            <button className="start-convo-btn" onClick={() => handleSendMessage("Hello! How can I assist you today?")}>
              Start Conversation
            </button>
          </div>
        ) : (
          chatMessages.map((msg, index) => (
            <div
              key={index}
              className={`chat-message ${
                msg.senderId === doctorId ? "doctor" : "patient"
              }`}
            >
              <div className={`message-content m-2 p-2 text-white rounded-2 ${msg.senderId === doctorId ? "bg-info" : "bg-success d-flex justify-content-end gap-2"}`}>
                <strong>{msg.displayName}:</strong> {msg.text}
              </div>
              <div className="timestamp d-inline">{formatTimestamp(msg.timestamp)}</div>
            </div>
          ))
        )}
      </div>

      <div className="chat-footer">
        <input
          type="text"
          className="chat-input"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage(newMessage)}
          placeholder="Type a message..."
        />
        <button className="send-btn" onClick={() => handleSendMessage(newMessage)}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
