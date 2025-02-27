// components/ChatBox.js
import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  orderBy,
  query,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useSession } from "next-auth/react";

const Chat = ({ chatOpen, onClose }) => {
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { data: session } = useSession();

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setChatMessages(snapshot.docs.map((doc) => doc.data()));
    });
    return () => unsubscribe();
  }, []);

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;
    try {
      await addDoc(collection(db, "messages"), {
        uid: session?.user?.id || session?.user?.uid,
        displayName: session?.user?.name || "Anonymous",
        text: newMessage,
        timestamp: serverTimestamp(),
      });
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
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
        {chatMessages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${
              msg.uid === (session?.user?.id || session?.user?.uid) ? "user" : "other"
            }`}
          >
            <strong>{msg.displayName}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-footer">
        <input
          type="text"
          className="chat-input"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          placeholder="Type a message..."
        />
        <button className="send-btn" onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;