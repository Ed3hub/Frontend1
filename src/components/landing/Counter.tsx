"use client";

import React, { useState, useEffect, useRef } from 'react';

interface CounterProps {
  target: number;
  duration?: number;
  suffix?: string;
}

/**
 * UTILITY: ANIMATED COUNTER COMPONENT
 */
const Counter: React.FC<CounterProps> = ({ target, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTime: number | null = null;

          const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            
            const currentCount = progress * target;
            setCount(currentCount);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(target);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );
    if (countRef.current) observer.observe(countRef.current);
    return () => observer.disconnect();
  }, [target, duration]);

  const displayValue = Number.isInteger(target) 
    ? Math.floor(count).toLocaleString() 
    : count.toFixed(1);

  return <span ref={countRef}>{displayValue}{suffix}</span>;
};

export default Counter;