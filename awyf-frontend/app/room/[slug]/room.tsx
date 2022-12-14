"use client";

import React from "react";

import { conn, EventData, useWebsocket } from "../../../src/websocket";

interface Props {
    roomId: string;
}

export default function Room(props: Props) {
  const [message, setMessage] = React.useState("");

  useWebsocket(console.log);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.currentTarget.value);
  };
  
  const onClick = () => {
    const message: EventData = {
      Type: "message",
      Content: "Content",
      ID: props.roomId,
      Sender: "Me"
    };
    conn.send(JSON.stringify(message));
  };

  return (
    <div className="text-black">
      <input value={message} onChange={onChange} />
      <button onClick={onClick}>Test</button>
    </div>
  );
}