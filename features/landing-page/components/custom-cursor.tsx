"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, label, summary, [tabindex]:not([tabindex="-1"])';

function isInteractiveElement(target: EventTarget | null) {
  if (!(target instanceof Element)) return false;
  return Boolean(target.closest(INTERACTIVE_SELECTOR));
}

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPressed, setIsPressed] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const syncEnabled = () => setIsEnabled(mediaQuery.matches);
    syncEnabled();

    if (!mediaQuery.matches) return;

    const handleMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
      setIsHovering(isInteractiveElement(event.target));
      setIsVisible(true);
    };

    const handleDown = () => setIsPressed(true);
    const handleUp = () => setIsPressed(false);
    const handleLeave = () => setIsVisible(false);
    const handleEnter = () => setIsVisible(true);

    mediaQuery.addEventListener("change", syncEnabled);
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);
    document.body.addEventListener("mouseleave", handleLeave);
    document.body.addEventListener("mouseenter", handleEnter);

    return () => {
      mediaQuery.removeEventListener("change", syncEnabled);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
      document.body.removeEventListener("mouseleave", handleLeave);
      document.body.removeEventListener("mouseenter", handleEnter);
    };
  }, []);

  if (!isEnabled || !isVisible) return null;

  const scale = isPressed ? (isHovering ? 1.8 : 1.6) : isHovering ? 1.35 : 1;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-9999 hidden md:block"
      style={{
        x: position.x,
        y: position.y,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      <motion.div
        animate={{ scale }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="relative flex items-center justify-center"
      >
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          aria-hidden
          className="text-primary"
        >
          <path
            d="M 11 5 H 26.5 C 29.5 5 31 6.5 31 9.5 V 26"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 25 31 H 9.5 C 6.5 31 5 29.5 5 26.5 V 10"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 10 17.5 Q 18 13.5 26 17.5"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M 10 18.5 Q 18 22.5 26 18.5"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="18" cy="18" r="2.75" fill="black" />
        </svg>
      </motion.div>
    </motion.div>
  );
}
