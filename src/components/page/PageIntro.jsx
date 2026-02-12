"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function PageIntro({ title, tag }) {
  const root = useRef(null);

  useGSAP(
    () => {
      const chars = root.current.querySelectorAll("[data-char]");
      const sup = root.current.querySelector(".intro-sup");

      gsap.set(chars, {
        transformPerspective: 900,
        transformOrigin: "50% 50%",
      });

      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .fromTo(
          chars,
          { yPercent: 120, opacity: 0, rotateX: -35 },
          {
            yPercent: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.9,
            stagger: 0.018,
          },
        )
        .fromTo(
          sup,
          { y: 14, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          "-=0.35",
        );
      // subtle float for each letter (very minimal)
      chars.forEach((el, i) => {
        gsap.to(el, {
          y: i % 2 === 0 ? -3 : 3,
          rotateZ: i % 3 === 0 ? 0.6 : -0.6,
          duration: 3.2 + (i % 5) * 0.25,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: 0.2 + i * 0.03,
        });
      });
    },
    { scope: root },
  );

  const onHoldStart = (e) => {
    const el = e.currentTarget;

    el.setPointerCapture?.(e.pointerId);
    gsap.killTweensOf(el);

    // Inflate bigger with a little overshoot + wobble
    const tl = gsap.timeline();

    tl.to(el, {
      scale: 2.05, // bigger balloon size
      rotateZ: -6, // slight tilt
      y: -10, // float up a touch
      duration: 0.16,
      ease: "power3.out",
    })
      .to(el, {
        scale: 1.92, // settle from overshoot
        rotateZ: 5,
        duration: 0.14,
        ease: "sine.inOut",
      })
      .to(el, {
        rotateZ: -3,
        duration: 0.14,
        ease: "sine.inOut",
      })
      .to(el, {
        rotateZ: 0,
        duration: 0.16,
        ease: "sine.inOut",
      });
  };

  const onHoldEnd = (e) => {
    const el = e.currentTarget;

    gsap.killTweensOf(el);

    // Return scale/tilt; let the float tween keep controlling y
    gsap.to(el, {
      scale: 1,
      rotateZ: 0,
      duration: 0.85,
      ease: "elastic.out(1, 0.4)",
    });
  };

  return (
    <div ref={root} className="intro-only">
      <h1 className="intro-title" aria-label={title}>
        {[...title].map((ch, i) => (
          <span key={i} className="intro-char-wrap">
            <button
              type="button"
              className="intro-char"
              data-char
              aria-label={`Letter ${ch === " " ? "space" : ch}`}
              onPointerDown={onHoldStart}
              onPointerUp={onHoldEnd}
              onPointerCancel={onHoldEnd}
              onPointerLeave={onHoldEnd}
            >
              {ch === " " ? "\u00A0" : ch}
            </button>
          </span>
        ))}
        <sup className="intro-sup">{tag}</sup>
      </h1>
    </div>
  );
}
