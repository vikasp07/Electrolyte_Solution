// Small hook to add subtle 3D tilt to an element on mouse move.
// Respect user's reduced motion settings.
import { useRef, useEffect } from "react";

export default function useTilt(enabled = true, config = {}) {
  const elRef = useRef(null);

  useEffect(() => {
    if (!enabled || !elRef.current) return;

    const el = elRef.current;
    const { max = 12, perspective = 800, transition = 150 } = config;

    const prefersReduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;

      const rx = (py - 0.5) * max;
      const ry = (px - 0.5) * -max;

      el.style.transform = `perspective(${perspective}px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(6px)`;
    };

    const onEnter = () => {
      el.style.willChange = "transform";
      el.style.transition = `transform ${transition}ms ease-out`;
    };

    const onLeave = () => {
      el.style.transition = `transform ${transition}ms ease-out`;
      el.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) translateZ(0px)`;
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      el.style.willChange = "";
      el.style.transition = "";
      el.style.transform = "";
    };
  }, [enabled, config]);

  return elRef;
}
