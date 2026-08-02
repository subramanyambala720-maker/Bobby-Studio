import { useRef, useEffect, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { useInView } from 'framer-motion';

interface TextRevealProps {
  children: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  delay?: number;
  stagger?: number;
  splitBy?: 'chars' | 'words' | 'lines';
}

const TextReveal = ({
  children,
  className = '',
  as: Tag = 'h2',
  delay = 0,
  stagger = 0.03,
  splitBy = 'chars',
}: TextRevealProps) => {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef as any, { once: true, margin: '-50px' });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current || !containerRef.current) return;
    hasAnimated.current = true;

    const container = containerRef.current;
    const text = children;
    container.innerHTML = '';

    if (splitBy === 'chars') {
      // Split into words first, then chars within words
      const words = text.split(' ');
      words.forEach((word, wordIndex) => {
        const wordSpan = document.createElement('span');
        wordSpan.style.display = 'inline-block';
        wordSpan.style.whiteSpace = 'nowrap';

        word.split('').forEach((char) => {
          const charSpan = document.createElement('span');
          charSpan.textContent = char;
          charSpan.style.display = 'inline-block';
          charSpan.style.opacity = '0';
          charSpan.style.transform = 'translateY(100%)';
          charSpan.className = 'char-reveal';
          wordSpan.appendChild(charSpan);
        });

        container.appendChild(wordSpan);

        if (wordIndex < words.length - 1) {
          const space = document.createElement('span');
          space.innerHTML = '&nbsp;';
          space.style.display = 'inline-block';
          container.appendChild(space);
        }
      });

      const chars = container.querySelectorAll('.char-reveal');
      gsap.to(chars, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger,
        delay,
        ease: 'power3.out',
      });
    } else if (splitBy === 'words') {
      const words = text.split(' ');
      words.forEach((word, i) => {
        const wrapper = document.createElement('span');
        wrapper.style.display = 'inline-block';
        wrapper.style.overflow = 'hidden';
        wrapper.style.marginRight = '0.3em';

        const inner = document.createElement('span');
        inner.textContent = word;
        inner.style.display = 'inline-block';
        inner.style.opacity = '0';
        inner.style.transform = 'translateY(100%)';
        inner.className = 'word-reveal';

        wrapper.appendChild(inner);
        container.appendChild(wrapper);
      });

      const wordEls = container.querySelectorAll('.word-reveal');
      gsap.to(wordEls, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: stagger * 3,
        delay,
        ease: 'power3.out',
      });
    } else {
      // Lines — just fade in the whole text
      container.textContent = text;
      container.style.opacity = '0';
      container.style.transform = 'translateY(30px)';
      gsap.to(container, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay,
        ease: 'power3.out',
      });
    }
  }, [isInView, children, delay, stagger, splitBy]);

  return (
    <Tag
      ref={containerRef as any}
      className={`overflow-hidden ${className}`}
    >
      {children}
    </Tag>
  );
};

export default TextReveal;
