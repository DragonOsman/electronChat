import React from "react";
import { ipcMain } from "electron";

export default function App() {
  const title = "Hello World";
  const enhancedTitle = `${title} - React App!`;

  const sendNotification = () => {
    ipcMain.on("e_notification", () => {
      e_notification.sendNotification("My custom message!");
    });
  };

  return (
    <>
      <h1>{enhancedTitle}</h1>
      <button onClick={sendNotification}>Send Notification</button>
    </>
  );
};