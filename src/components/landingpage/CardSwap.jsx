"use client";

import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import gsap from "gsap";

function createSlot(index, cardDistance, verticalDistance, total) {
  return {
    x: index * cardDistance,
    y: -index * verticalDistance,
    z: -index * cardDistance * 1.35,
    zIndex: total - index,
  };
}

function placeCard(element, slot, skewAmount) {
  gsap.set(element, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    zIndex: slot.zIndex,
    skewY: skewAmount,
    transformOrigin: "center center",
    force3D: true,
  });
}

export const Card = forwardRef(function Card(
  { customClass = "", className = "", ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={`absolute left-1/2 top-1/2 overflow-hidden rounded-[22px] border border-[var(--hero-card-border)] bg-[var(--hero-card-strong)] shadow-[0_20px_55px_var(--shadow-soft)] [backface-visibility:hidden] [transform-style:preserve-3d] [will-change:transform] ${customClass} ${className}`.trim()}
      {...props}
    />
  );
});

export default function CardSwap({
  children,
  width = "100%",
  height = 320,
  cardDistance = 28,
  verticalDistance = 24,
  skewAmount = 0,
  easing = "power3.inOut",
  onCardClick,
  className = "",
  stackClassName = "",
  buttonClassName = "",
}) {
  const childArray = Children.toArray(children);
  const orderRef = useRef([]);
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const timelineRef = useRef(null);
  const isAnimatingRef = useRef(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return undefined;
    }

    const cards = Array.from(
      container.querySelectorAll('[data-cardswap-card="true"]')
    );

    cardsRef.current = cards;
    orderRef.current = Array.from({ length: cards.length }, (_, index) => index);

    cards.forEach((card, index) => {
      placeCard(
        card,
        createSlot(index, cardDistance, verticalDistance, cards.length),
        skewAmount
      );
    });

    return () => {
      timelineRef.current?.kill();
      timelineRef.current = null;
      isAnimatingRef.current = false;
      setIsAnimating(false);
    };
  }, [cardDistance, verticalDistance, skewAmount, childArray.length]);

  const swap = useCallback(() => {
    const cards = cardsRef.current;

    if (isAnimatingRef.current || orderRef.current.length < 2) {
      return;
    }

    isAnimatingRef.current = true;
    setIsAnimating(true);

    const [frontIndex, ...remaining] = orderRef.current;
    const frontCard = cards[frontIndex];
    const backSlot = createSlot(
      cards.length - 1,
      cardDistance,
      verticalDistance,
      cards.length
    );
    const dropDistance = Math.max(verticalDistance * 4.5, 180);

    timelineRef.current?.kill();

    timelineRef.current = gsap.timeline({
      defaults: { ease: easing },
      onComplete: () => {
        orderRef.current = [...remaining, frontIndex];
        isAnimatingRef.current = false;
        setIsAnimating(false);
      },
    });

    timelineRef.current.to(frontCard, {
      y: `+=${dropDistance}`,
      duration: 0.42,
    });

    timelineRef.current.call(() => {
      gsap.set(frontCard, { zIndex: backSlot.zIndex });
    });

    timelineRef.current.addLabel("promote");

    remaining.forEach((cardIndex, index) => {
      const card = cards[cardIndex];
      const nextSlot = createSlot(
        index,
        cardDistance,
        verticalDistance,
        cards.length
      );

      timelineRef.current.set(card, { zIndex: nextSlot.zIndex }, "promote");
      timelineRef.current.to(
        card,
        {
          x: nextSlot.x,
          y: nextSlot.y,
          z: nextSlot.z,
          duration: 0.52,
        },
        `promote+=${index * 0.08}`
      );
    });

    timelineRef.current.addLabel("return", "promote+=0.08");
    timelineRef.current.to(
      frontCard,
      {
        x: backSlot.x,
        y: backSlot.y,
        z: backSlot.z,
        duration: 0.52,
      },
      "return"
    );
  }, [cardDistance, easing, verticalDistance]);

  const renderedCards = childArray.map((child, index) => {
    if (!isValidElement(child)) {
      return child;
    }

    return cloneElement(child, {
      key: child.key ?? index,
      "data-cardswap-card": "true",
      style: {
        width,
        height,
        ...(child.props.style ?? {}),
      },
      onClick: (event) => {
        child.props.onClick?.(event);
        onCardClick?.(index);
      },
    });
  });

  return (
    <div className={`flex w-full flex-col items-center gap-5 ${className}`.trim()}>
      <div
        ref={containerRef}
        className={`relative mx-auto origin-center overflow-visible perspective-[1200px] ${stackClassName}`.trim()}
        style={{ width, height }}
      >
        {renderedCards}
      </div>

      <button
        type="button"
        onClick={swap}
        disabled={isAnimating}
        className={`inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] px-5 py-2.5 text-sm font-semibold text-[var(--foreground)] shadow-[0_16px_40px_var(--shadow-soft)] transition hover:-translate-y-0.5 hover:border-[var(--accent-strong)] hover:bg-[var(--surface-strong)] disabled:pointer-events-none disabled:opacity-50 ${buttonClassName}`.trim()}
      >
        <span>Next</span>
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
