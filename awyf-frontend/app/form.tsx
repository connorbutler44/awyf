"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Input from "../src/components/Input";

export default function Form() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [roomCode, setRoomCode] = useState("");

  const onCreateRoomClicked = () => {
    console.log("Create Room");
    router.push(`/room/${roomCode}`);
  };

  const onPlayClicked = () => {
    router.push(`/room/${roomCode}`);
  };

  return (
    <div className="w-96">
      <div>
        <div className="py-2 text-xl font-bold">Name</div>
        <Input value={username} onChange={(e) => setUsername(e.currentTarget.value)}/>
      </div>
      <div className="my-4">
        <div className="py-2 text-xl font-bold">Room Code</div>
        <Input value={roomCode} onChange={(e) => setRoomCode(e.currentTarget.value)}/>
      </div>
      <div className="flex justify-around">
        <button
          className="bg-blue-500 rounded text-xl font-bold p-4 disabled:bg-gray-500"
          onClick={onCreateRoomClicked}
          disabled={!username || !!roomCode}
        >
          Create Room
        </button>
        <button
          className="bg-blue-500 rounded text-xl font-bold p-4  disabled:bg-gray-500"
          onClick={onPlayClicked}
          disabled={!username || !roomCode}
        >
          Play
        </button>
      </div>
    </div>
  );
}