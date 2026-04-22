"use client";

import { useEffect, useRef, useState } from "react";

function isElementInView(element) {
  const rect = element.getBoundingClientRect();
  const viewportHeight =
    window.innerHeight || document.documentElement.clientHeight;

  return rect.top <= viewportHeight * 0.92 && rect.bottom >= viewportHeight * 0.08;
}

export default function ScrollReveal({
  as: Component = "div",
  children,
  className = "",
  delay = 0,
  initialVisible = false,
  once = false,
  rootMargin = "0px 0px -12% 0px",
  style,
  threshold = 0.14,
  ...props
}) {
  const ref = useRef(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isVisible, setIsVisible] = useState(initialVisible);

  useEffect(() => {
    const element = ref.current;
    let frameId = 0;

    frameId = window.requestAnimationFrame(() => {
      setIsHydrated(true);

      if (!element) {
        return;
      }

      if (
        window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        isElementInView(element)
      ) {
        setIsVisible(true);
        return;
      }

      if (!once) {
        setIsVisible(false);
      }
    });

    if (!element) {
      return () => window.cancelAnimationFrame(frameId);
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return () => window.cancelAnimationFrame(frameId);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);

          if (once) {
            observer.unobserve(element);
          }

          return;
        }

        if (!once) {
          setIsVisible(false);
        }
      },
      {
        rootMargin,
        threshold,
      }
    );

    observer.observe(element);

    return () => {
      window.cancelAnimationFrame(frameId);
      observer.disconnect();
    };
  }, [once, rootMargin, threshold]);

  const shouldShow = !isHydrated || isVisible;

  return (
    <Component
      ref={ref}
      className={`scroll-reveal${shouldShow ? " is-visible" : ""}${
        className ? ` ${className}` : ""
      }`}
      style={{
        ...style,
        "--reveal-delay": `${delay}ms`,
      }}
      {...props}
    >
      {children}
    </Component>
  );
}
