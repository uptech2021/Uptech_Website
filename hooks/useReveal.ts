"use client";

import { useEffect } from "react";

export function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const show = (el: HTMLElement) => el.classList.add("in");

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            show(e.target as HTMLElement);
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.08 }
    );

    els.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.96) {
        show(el);
      } else {
        io.observe(el);
      }
    });

    // Safety nets
    const onLoad = () => els.forEach(show);
    window.addEventListener("load", onLoad);
    const timeout = setTimeout(() => els.forEach(show), 1500);

    return () => {
      window.removeEventListener("load", onLoad);
      clearTimeout(timeout);
      io.disconnect();
    };
  }, []);
}
