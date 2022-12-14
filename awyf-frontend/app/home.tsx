"use client";

import React from "react";
import { initializeWebsocket } from "../src/websocket";

initializeWebsocket();

export default function Home({
  children,
}: {
    children: React.ReactNode,
}) {
  return <>{children}</>;
}