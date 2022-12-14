import { useEffect, useRef, useState } from "react";

type EventType = "message";

export interface EventData {
  Type: EventType;
  Sender: string;
  Content: string;
  ID: string;
}

// TODO: NextJS is erroring out on this hook even when defined in a client component.
// Need to figure out why it's complaining about WebSocket not being defined on the server
// when this shouldn't be computed on the server in the first place
export const useWebsocket = ({
  url,
  onMessage,
}: {
  url: string,
  onMessage: (event: EventData) => void,
}) => {
  const [readyState, setReadyState] = useState<number>(WebSocket.CONNECTING);
  const wsRef = useRef<WebSocket>();

  useEffect(() => {
    setReadyState(WebSocket.CONNECTING);
    console.log("Establishing socket connection");
    const websocket = new WebSocket(url);
    wsRef.current = websocket;

    websocket.addEventListener("open", async () => {
      console.log("Socket connection open");
      await new Promise(r => setTimeout(r, 2000));
      setReadyState(wsRef.current?.readyState || WebSocket.CONNECTING);
    });
        
    websocket.addEventListener("close", () => {
      console.log("Socket connection closed");
      setReadyState(wsRef.current?.readyState || WebSocket.CONNECTING);
    });
  
    websocket.addEventListener("error", (err) => {
      console.log("Error with socket connection", err);
      setReadyState(wsRef.current?.readyState || WebSocket.CONNECTING);
    });

    const handleMessage = (evt: MessageEvent) => {
      onMessage(JSON.parse(evt.data));
    };

    websocket.addEventListener("message", handleMessage);

    return () => {
      wsRef.current = undefined;
      websocket.close();
    };
  }, [onMessage, url]);

  const sendMessage = (message: string) => {
    if (wsRef.current) {
      wsRef.current.send(message);
    } else {
      throw Error("Websocket not defined");
    }
  };
  
  return {
    readyState,
    sendMessage,
  };
};
