"use client";

import React from "react";

import { EventData, useWebsocket } from "../../../src/websocket";

interface Props {
    roomId: string;
}

export default function Room(props: Props) {
  const [message, setMessage] = React.useState("");

  const { readyState, sendMessage } = useWebsocket({
    onMessage: console.log,
    url: `ws://localhost:8080/ws/${props.roomId}`,
  });

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

    sendMessage(JSON.stringify(message));
  };

  return (
    <div className="text-black">
      <Loading readyState={readyState}>
        <input value={message} onChange={onChange} />
        <button onClick={onClick}>Test</button>
      </Loading>
    </div>
  );
}

export const Loading = ({ readyState, children }: {
  readyState: number,
  children: React.ReactNode,
}) => {
  switch (readyState) {
  case WebSocket.OPEN:
    return <div>{children}</div>;
  case WebSocket.CLOSED:
  case WebSocket.CLOSING:
    return <>Error establishing socket connection</>;
  case WebSocket.CONNECTING:
    return <>Connecting to server...</>;
  default:
    return <></>;
  }
};