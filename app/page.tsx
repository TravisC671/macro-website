"use client";

import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import Connect from "./lib/connect";
import Keyboard from "./lib/keyboard";

export default function Home() {
  return (
    <div className="">
      <Connect />
      <TransformWrapper limitToBounds={false} minScale={0.25} maxScale={2.5}>
        <TransformComponent
          wrapperStyle={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Keyboard />
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
}
