"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";
import { EyeIcon } from "@/components/eye-icon";

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, label, summary, [tabindex]:not([tabindex="-1"])';

function isInteractiveElement(target: EventTarget | null) {
  if (!(target instanceof Element)) return false;
  return Boolean(target.closest(INTERACTIVE_SELECTOR));
}

export function CustomCursor() {
  const [isPressed, setIsPressed] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 520, damping: 38, mass: 0.55 };
  const ringSpringConfig = { stiffness: 280, damping: 32, mass: 0.75 };

  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);
  const ringX = useSpring(mouseX, ringSpringConfig);
  const ringY = useSpring(mouseY, ringSpringConfig);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const syncEnabled = () => setIsEnabled(mediaQuery.matches);
    syncEnabled();

    if (!mediaQuery.matches) return;

    const handleMove = (event: MouseEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
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
  }, [mouseX, mouseY]);

  if (!isEnabled || !isVisible) return null;

  const eyeScale = isPressed ? (isHovering ? 1.22 : 1.14) : isHovering ? 1.08 : 1;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-9998 hidden md:block"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            scale: isPressed ? 1.55 : isHovering ? 1.35 : 1,
            opacity: isHovering ? 0.55 : 0.28,
          }}
          transition={{ type: "spring", stiffness: 420, damping: 28 }}
          className="size-10 rounded-full border border-primary/40 bg-primary/5 backdrop-blur-[1px]"
        />
      </motion.div>

      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-9999 hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{ scale: eyeScale }}
          transition={{ type: "spring", stiffness: 500, damping: 26 }}
          className="relative flex items-center justify-center"
        >
          <motion.div
            animate={{
              scaleY: isPressed ? 0.2 : 1,
            }}
            transition={{
              duration: isPressed ? 0.1 : 0.22,
              ease: isPressed ? "easeIn" : [0.22, 1, 0.36, 1],
            }}
            className="origin-center"
          >
            <EyeIcon size={36} pupilClassName="fill-foreground" />
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
}
