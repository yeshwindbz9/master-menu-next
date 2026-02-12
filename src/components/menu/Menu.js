"use client";

import "./menu.css";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const menuLinks = [
  { path: "/", label: "Home" },
  { path: "/work", label: "Work" },
  { path: "/about", label: "About" },
  { path: "/contact", label: "Contact" },
  { path: "/lab", label: "Lab" },
];

const Menu = () => {
  const container = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const tl = useRef(null);

  const toggleMenu = () => setIsMenuOpen((v) => !v);

  useGSAP(
    () => {
      gsap.set(".menu-link-item-holder", { y: 90, opacity: 0 });
      gsap.set(".menu-overlay", { pointerEvents: "none" });

      tl.current = gsap
        .timeline({ paused: true })
        .to(".menu-overlay", {
          duration: 1.1,
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          ease: "power4.inOut",
          onStart: () => gsap.set(".menu-overlay", { pointerEvents: "auto" }),
        })
        .to(
          ".menu-link-item-holder",
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.08,
            ease: "power4.out",
          },
          "-=0.5",
        );
    },
    { scope: container },
  );

  useEffect(() => {
    if (!tl.current) return;
    if (isMenuOpen) tl.current.play();
    else tl.current.reverse();
  }, [isMenuOpen]);

  return (
    <div className="menu-container" ref={container}>
      <div className="menu-bar">
        <div className="menu-logo">
          <Link href="/">Modern Navigations</Link>
        </div>

        <button
          className="menu-open"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-controls="menu-overlay"
          type="button"
        >
          <span>Menu</span>
        </button>
      </div>

      <div className="menu-overlay" id="menu-overlay">
        <div className="menu-overlay-bar">
          <div className="menu-logo">
            <Link href="/">Modern Navigations</Link>
          </div>

          <button className="menu-close" onClick={toggleMenu} type="button">
            <span>Close</span>
          </button>
        </div>

        <button
          className="menu-close-icon"
          onClick={toggleMenu}
          type="button"
          aria-label="Close menu"
        >
          <span>&#x2715;</span>
        </button>

        <div className="menu-copy">
          <div className="menu-links">
            {menuLinks.map((link) => (
              <div className="menu-link-item" key={link.path}>
                <div className="menu-link-item-holder" onClick={toggleMenu}>
                  <Link href={link.path} className="menu-link">
                    {link.label}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="menu-info">
            <div className="menu-info-col">
              <a href="#">X &#8599;</a>
              <a href="#">Instagram &#8599;</a>
              <a href="#">LinkedIn &#8599;</a>
              <a href="#">Dribbble &#8599;</a>
              <a href="#">Behance &#8599;</a>
            </div>
            <div className="menu-info-col">
              <p>info@yeshwin.com</p>
              <p>+44 7894562348</p>
            </div>
          </div>
        </div>

        <div className="menu-preview">
          <a className="menu-preview-link" href="#">
            View Showreel <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Menu;
