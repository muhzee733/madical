import Layout from "../components/Layout/Layout";
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
        setChatMessages(docSnap.data().messages || []);
      } else {
        setChatMessages([]);
      }
    });

    return () => unsubscribe();
  }, [patientId]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const chatDocRef = doc(db, "messages", `${doctorId}_${patientId}`);

    try {
      await updateDoc(chatDocRef, {
        messages: arrayUnion({
          text: newMessage,
          senderId: patientId,
          displayName: "Patient",
          timestamp: new Date(), // Using JavaScript Date instead of serverTimestamp()
        }),
        lastUpdated: serverTimestamp(), // Using serverTimestamp() separately for tracking updates
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
      <Layout>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100vh",
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
                    maxWidth: "70%",
                    wordWrap: "break-word",
                    alignSelf:
                      msg.senderId === patientId ? "flex-end" : "flex-start",
                    backgroundColor:
                      msg.senderId === patientId ? "#28a745" : "#17a2b8",
                    color: "white",
                    padding: "10px",
                    borderRadius: "10px",
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
