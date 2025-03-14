import React, { useState, useEffect } from "react";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../../firebase";

const Chat = ({ chatOpen, onClose, patientId }) => {
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

  useEffect(() => {
    if (doctorId && patientId) {
      const chatDocRef = doc(db, "messages", `${doctorId}_${patientId}`);

      getDoc(chatDocRef).then((docSnap) => {
        if (docSnap.exists()) {
          updateDoc(chatDocRef, {
            "notifications.doctorUnread": false,
          }).catch((error) => console.error("Error updating document:", error));
        }
      });
    }
  }, [doctorId, patientId]);

  const handleSendMessage = async (message) => {
    if (!message.trim()) return;
    const chatDocRef = doc(db, "messages", `${doctorId}_${patientId}`);
    const notificationDocRef = doc(
      db,
      "notifications",
      `${Date.now()}_${doctorId}`
    );
    try {
      const chatDocSnap = await getDoc(chatDocRef);
      const newMsg = {
        senderId: doctorId,
        displayName: user?.name || "Doctor",
        text: message,
        timestamp: new Date(),
      };

      if (chatDocSnap.exists()) {
        await updateDoc(chatDocRef, {
          messages: arrayUnion(newMsg),
          "notifications.patientUnread": true,
          "notifications.doctorUnread": false,
        });
      } else {
        await setDoc(chatDocRef, {
          doctorId,
          patientId,
          messages: [newMsg],
          notifications: {
            patientUnread: true,
            doctorUnread: false,
          },
        });
      }
      const notificationSnap = await getDoc(notificationDocRef);
      if (notificationSnap.exists()) {
        await updateDoc(notificationDocRef, {
          unreadMessages: arrayUnion({
            senderId: doctorId,
            timestamp: new Date(),
            text: message,
          }),
          unreadCount: notificationSnap.data().unreadCount + 1,
        });
      } else {
        await setDoc(notificationDocRef, {
          chatId: `${doctorId}_${patientId}`,
          doctorId,
          patientId,
          unreadMessages: [
            { senderId: doctorId, timestamp: new Date(), text: message },
          ],
          unreadCount: 1,
        });
      }

      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "";
    const date = timestamp.toDate?.() ?? new Date(timestamp);
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
        <button className="close-chat" onClick={onClose}>
          ✖
        </button>
      </div>

      <div className="chat-body">
        {chatMessages.length === 0 ? (
          <div className="text-center">
            <p>No messages yet.</p>
            <button
              className="start-convo-btn"
              onClick={() =>
                handleSendMessage("Hello! How can I assist you today?")
              }
            >
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
              <div
                className={`message-content m-2 p-2 text-white rounded-2 ${
                  msg.senderId === doctorId
                    ? "bg-info"
                    : "bg-success d-flex justify-content-end gap-2"
                }`}
              >
                <strong>{msg.displayName}:</strong> {msg.text}
              </div>
              <div className="timestamp d-inline">
                {formatTimestamp(msg.timestamp)}
              </div>
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
        <button
          className="send-btn"
          onClick={() => handleSendMessage(newMessage)}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
