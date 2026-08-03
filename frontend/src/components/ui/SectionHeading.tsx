import { type ReactNode } from 'react';
import FadeIn from '@/components/animations/FadeIn';

interface SectionHeadingProps {
  label?: string;
  title: string;
  titleAccent?: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
  children?: ReactNode;
}

const SectionHeading = ({
  label,
  title,
  titleAccent,
  description,
  align = 'center',
  className = '',
}: SectionHeadingProps) => {
  return (
    <div className={`${align === 'center' ? 'text-center' : 'text-left'} mb-12 md:mb-16 ${className}`}>
      {/* Label */}
      {label && (
        <FadeIn delay={0}>
          <p className="text-xs md:text-sm text-[#000000] tracking-[0.3em] uppercase font-display font-bold mb-3">
            {label}
          </p>
        </FadeIn>
      )}

      {/* Title */}
      <FadeIn delay={0.1}>
        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-luxury text-[#000000] text-balance leading-[1.12] font-semibold">
          {title}
          {titleAccent && (
            <>
              {' '}
              <span className="italic font-normal">{titleAccent}</span>
            </>
          )}
        </h2>
      </FadeIn>

      {/* Accent line */}
      <FadeIn delay={0.2}>
        <div className={`flex ${align === 'center' ? 'justify-center' : 'justify-start'} mt-6`}>
          <div className="w-16 h-[2.5px] bg-[#000000] rounded-full" />
          <div className="w-4 h-[2.5px] bg-[#000000]/40 rounded-full ml-2" />
        </div>
      </FadeIn>

      {/* Description */}
      {description && (
        <FadeIn delay={0.3}>
          <p className={`text-[#444444] text-base md:text-xl leading-relaxed mt-6 font-light ${align === 'center' ? 'max-w-3xl mx-auto' : 'max-w-xl'}`}>
            {description}
          </p>
        </FadeIn>
      )}
    </div>
  );
};

export default SectionHeading;
