import Layout from "../components/layout";
import React, { useState, useEffect } from "react";
import {
  doc,
  updateDoc,
  onSnapshot,
  arrayUnion,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase";
import Head from "next/head";

const PatientChatSystem = () => {
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [patientId, setPatientId] = useState("");
  const [unreadCount, setUnreadCount] = useState(0);
  const doctorId = "vXzSgKp4rKNnmgOXZQtVoVbvXdM2";

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    if (storedUser && storedUser._id) {
      setPatientId(storedUser._id);
    }
  }, []);

  useEffect(() => {
    if (!patientId) return;

    const chatDocRef = doc(db, "messages", `${doctorId}_${patientId}`);
    const unsubscribe = onSnapshot(chatDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setChatMessages(data.messages || []);

        // Update unread message count
        if (data.notifications?.patientUnread) {
          setUnreadCount((prev) => prev + 1);
          updateDoc(chatDocRef, {
            "notifications.patientUnread": false,
          }).catch((error) =>
            console.error("Error updating notification:", error)
          );
        }
      } else {
        setChatMessages([]);
      }
    });

    return () => unsubscribe();
  }, [patientId]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const chatDocRef = doc(db, "messages", `${doctorId}_${patientId}`);

    const message = {
      text: newMessage,
      senderId: patientId,
      displayName: "Patient",
      timestamp: new Date(), // Place the timestamp here
    };

    try {
      await updateDoc(chatDocRef, {
        messages: arrayUnion(message), // Adding message to the array
        lastUpdated: new Date(), // Update lastUpdated field separately
        notifications: {
          doctorUnread: true,
          patientUnread: false,
        },
      });
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <>
      <Head>
        <title>Chat System</title>
      </Head>
      <Layout unreadCount={unreadCount}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "92vh",
            backgroundColor: "#f0f0f0",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              overflowY: "auto",
              flexGrow: 1,
              padding: "1rem",
              marginTop: "10px",
            }}
          >
            {chatMessages.length === 0 ? (
              <div>No messages yet.</div>
            ) : (
              chatMessages.map((msg, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: "#fff",
                    border: "1px solid #eaeaea",
                    color: msg.senderId === patientId ? "white" : "gray",
                    float: "left",
                    position: "relative",
                    padding: "8px 15px",
                    borderRadius: "20px 20px 20px 20px",
                    maxWidth: "70%",
                    wordWrap: "break-word",
                    alignSelf:
                      msg.senderId === patientId ? "flex-end" : "flex-start",
                    backgroundColor:
                      msg.senderId === patientId ? "gray" : "white",
                    marginBottom: "10px",
                  }}
                >
                  <strong>{msg.displayName}:</strong> {msg.text}
                </div>
              ))
            )}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "1rem",
              backgroundColor: "#fff",
              boxShadow: "0px -2px 5px rgba(0, 0, 0, 0.1)",
            }}
          >
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              style={{
                flexGrow: 1,
                borderRadius: "25px",
                padding: "10px",
                border: "1px solid #ccc",
              }}
              placeholder="Type a message..."
            />
            <button
              onClick={handleSendMessage}
              style={{
                marginLeft: "10px",
                padding: "10px 20px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "25px",
                cursor: "pointer",
              }}
            >
              Send
            </button>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default PatientChatSystem;
