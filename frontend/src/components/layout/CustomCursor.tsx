import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const cursorDotX = useMotionValue(-100);
  const cursorDotY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 200 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const isHovering = useRef(false);
  const outerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      cursorDotX.set(e.clientX - 4);
      cursorDotY.set(e.clientY - 4);
    };

    const handleMouseEnterInteractive = () => {
      isHovering.current = true;
      if (outerRef.current) {
        outerRef.current.style.transform = 'scale(1.8)';
        outerRef.current.style.borderColor = 'rgba(0, 0, 0, 0.8)';
      }
    };

    const handleMouseLeaveInteractive = () => {
      isHovering.current = false;
      if (outerRef.current) {
        outerRef.current.style.transform = 'scale(1)';
        outerRef.current.style.borderColor = 'rgba(0, 0, 0, 0.3)';
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    const interactiveElements = document.querySelectorAll('a, button, [data-cursor-hover]');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnterInteractive);
      el.addEventListener('mouseleave', handleMouseLeaveInteractive);
    });

    const observer = new MutationObserver(() => {
      const newElements = document.querySelectorAll('a, button, [data-cursor-hover]');
      newElements.forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnterInteractive);
        el.addEventListener('mouseleave', handleMouseLeaveInteractive);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnterInteractive);
        el.removeEventListener('mouseleave', handleMouseLeaveInteractive);
      });
    };
  }, [cursorX, cursorY, cursorDotX, cursorDotY]);

  if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
    return null;
  }

  return (
    <>
      {/* Outer Ring — Black Outline */}
      <motion.div
        ref={outerRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-black/30 pointer-events-none z-[9999] transition-transform duration-200 ease-out"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      />
      {/* Inner Dot — Black */}
      <motion.div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-black pointer-events-none z-[9999]"
        style={{
          x: cursorDotX,
          y: cursorDotY,
        }}
      />
    </>
  );
};

export default CustomCursor;
