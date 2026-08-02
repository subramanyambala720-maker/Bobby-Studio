import { useEffect, useRef, type ReactNode } from 'react';

interface SmoothScrollProps {
  children: ReactNode;
}

const SmoothScroll = ({ children }: SmoothScrollProps) => {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    // Dynamically import Lenis for smooth scroll
    // If Lenis is not installed, gracefully degrade to native scroll
    let lenis: any = null;
    let animationFrameId: number;

    const initLenis = async () => {
      try {
        const LenisModule = await import('lenis');
        const Lenis = LenisModule.default || LenisModule;

        lenis = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical' as const,
          gestureOrientation: 'vertical' as const,
          smoothWheel: true,
          touchMultiplier: 2,
        });

        lenisRef.current = lenis;

        const raf = (time: number) => {
          lenis.raf(time);
          animationFrameId = requestAnimationFrame(raf);
        };

        animationFrameId = requestAnimationFrame(raf);
      } catch {
        // Lenis not available, use native scroll
        console.info('Lenis not available, using native scroll');
      }
    };

    initLenis();

    return () => {
      if (lenis) lenis.destroy();
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;
