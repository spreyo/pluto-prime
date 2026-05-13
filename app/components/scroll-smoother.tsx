"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function ScrollSmoother() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | undefined;

    const setup = () => {
      lenis?.destroy();
      lenis = undefined;

      if (reducedMotion.matches) {
        return;
      }

      lenis = new Lenis({
        autoRaf: true,
        anchors: {
          offset: -72,
          duration: 1,
        },
        lerp: 0.085,
        smoothWheel: true,
      });
    };

    setup();
    reducedMotion.addEventListener("change", setup);

    return () => {
      reducedMotion.removeEventListener("change", setup);
      lenis?.destroy();
    };
  }, []);

  return null;
}
