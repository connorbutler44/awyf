import { useEffect } from "react";

export let conn: WebSocket;

export function initializeWebsocket() {
  conn = new WebSocket("ws://localhost:8080/ws/room2");

  conn.addEventListener("open", () => {
    console.log("Socket connection open");
  });
      
  conn.addEventListener("close", () => {
    console.log("Socket connection closed");
  });

  conn.addEventListener("error", (err) => {
    console.log("Error with socket connection", err);
  });
};

type EventType = "message";

export interface EventData {
    Type: EventType;
    Sender: string;
    Content: string;
    ID: string;
}

export function useWebsocket(onMessage: (data: EventData) => void) {
  useEffect(() => {
    const handleMessage = (evt: MessageEvent<string>) => {
      onMessage(JSON.parse(evt.data));
    };

    conn.addEventListener("message", handleMessage);

    return () => {
      conn.removeEventListener("message", handleMessage);
    };
  }, [onMessage]);
}
