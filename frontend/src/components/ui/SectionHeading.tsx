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
    <div className={`${align === 'center' ? 'text-center' : 'text-left'} mb-16 md:mb-20 ${className}`}>
      {/* Label */}
      {label && (
        <FadeIn delay={0}>
          <p className="text-sm text-primary tracking-[0.25em] uppercase font-display mb-4">
            {label}
          </p>
        </FadeIn>
      )}

      {/* Title */}
      <FadeIn delay={0.1}>
        <h2 className="text-display font-luxury text-text text-balance">
          {title}
          {titleAccent && (
            <>
              {' '}
              <span className="text-gradient-gold italic">{titleAccent}</span>
            </>
          )}
        </h2>
      </FadeIn>

      {/* Gold accent line */}
      <FadeIn delay={0.2}>
        <div className={`flex ${align === 'center' ? 'justify-center' : 'justify-start'} mt-6`}>
          <div className="w-12 h-[2px] bg-primary rounded-full" />
          <div className="w-4 h-[2px] bg-primary/40 rounded-full ml-2" />
        </div>
      </FadeIn>

      {/* Description */}
      {description && (
        <FadeIn delay={0.3}>
          <p className={`text-muted text-clamp-base leading-relaxed mt-6 ${align === 'center' ? 'max-w-2xl mx-auto' : 'max-w-xl'}`}>
            {description}
          </p>
        </FadeIn>
      )}
    </div>
  );
};

export default SectionHeading;
