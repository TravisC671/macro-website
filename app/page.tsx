"use client";
import Connect from "./lib/connect";
import Keyboard from "./lib/keyboard";
import CanvasPan from "@/components/canvas-pan";

export default function Home() {
  return (
    <div className="">
      <Connect />
      <CanvasPan className="h-screen w-screen">
        <Keyboard />
      </CanvasPan>
    </div>
  );
}
