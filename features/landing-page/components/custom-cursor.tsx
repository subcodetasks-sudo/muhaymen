"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPressed, setIsPressed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    if (!mediaQuery.matches) return;

    const handleMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
      setIsVisible(true);
    };

    const handleDown = () => setIsPressed(true);
    const handleUp = () => setIsPressed(false);
    const handleLeave = () => setIsVisible(false);
    const handleEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);
    document.body.addEventListener("mouseleave", handleLeave);
    document.body.addEventListener("mouseenter", handleEnter);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
      document.body.removeEventListener("mouseleave", handleLeave);
      document.body.removeEventListener("mouseenter", handleEnter);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
      style={{
        x: position.x,
        y: position.y,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      <motion.div
        animate={{ scale: isPressed ? 1.6 : 1 }}
        transition={{ duration: 0.2 }}
        className="relative flex items-center justify-center"
      >
        <div
          className="flex h-9 w-9 items-center justify-center rounded-[10px] border-2 border-primary"
          style={{ background: "rgba(245,168,0,0.12)" }}
        >
          <div className="flex h-4 w-4 items-center justify-center rounded-full border-2 border-primary">
            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
          </div>
        </div>
        <div className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-primary" />
        <div className="absolute -left-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-primary" />
        <div className="absolute -bottom-0.5 -right-0.5 h-1.5 w-1.5 rounded-full bg-primary" />
        <div className="absolute -bottom-0.5 -left-0.5 h-1.5 w-1.5 rounded-full bg-primary" />
      </motion.div>
    </motion.div>
  );
}
