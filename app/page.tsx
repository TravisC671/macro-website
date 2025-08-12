"use client";
import Connect from "./lib/connect";
import Keyboard from "./lib/keyboard";
import CanvasPan from "@/components/canvas-pan";
import Sidebar from "./lib/sidebar";

export default function Home() {
  return (
    <div className="">
      <Sidebar />
      <Connect />
      <CanvasPan className="h-screen w-screen">
        <Keyboard />
      </CanvasPan>
    </div>
  );
}
