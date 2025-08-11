import { cn } from "@/lib/utils";
import { ReactNode, useRef, useState } from "react";

type CanvasPanProps = {
  children: ReactNode;
  className: string;
};

export default function CanvasPan({ children, className }: CanvasPanProps) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isDragging, setDragging] = useState(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const canvas = useRef<HTMLDivElement>(null);

  const onMouseDown = (e: React.MouseEvent) => {
    if (e.target === canvas.current) {
      setDragging(true)
      lastPos.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
    }
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPos({
        x: e.clientX - lastPos.current.x,
        y: e.clientY - lastPos.current.y,
      });
    }
  };

  const onMouseUp = () => {
    setDragging(false)
  };

  return (
    <div
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      className={cn("overflow-hidden flex justify-center items-center", className)}
      ref={canvas}
      style={{ cursor: isDragging ? "grabbing" : "grab" }}
    >
      <div
        style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
      >
        {children}
      </div>
    </div>
  );
}
