import React, { useEffect } from "react";
import { urlBase64ToUint8Array } from "./utils";
import "./App.css";

function App() {

  const userId = getUserId();

  useEffect(() => {
    initPush();
  }, []);

  function getUserId() {
    let userId = localStorage.getItem("userId");

    if (!userId) {
      userId = "user_" + Math.floor(Math.random() * 1000);
      localStorage.setItem("userId", userId);
    }

    return userId;
  }

  const initPush = async () => {
    const registration = await navigator.serviceWorker.register("/sw.js");

    const permission = await Notification.requestPermission();
    if (permission !== "granted") return;

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(process.env.REACT_APP_PUBLIC_KEY),
    });

    await fetch(`${process.env.REACT_APP_SERVER_URL}/notifications/save-subscription`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        subscription,
      }),
    });
  };

  const sendNotification = async () => {
    await fetch(`${process.env.REACT_APP_SERVER_URL}/notifications`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        message: "Hello from React",
      }),
    });
  };

 return (
  <div className="container">
    <div className="card">
      <h2 className="title">Push Notification Client</h2>

      <p className="user">User: {userId}</p>

      <button className="button" onClick={sendNotification}>
        Send Notification
      </button>
    </div>
  </div>
);
}

export default App;