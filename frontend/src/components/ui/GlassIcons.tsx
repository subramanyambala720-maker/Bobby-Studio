import React from 'react';
import './GlassIcons.css';

export interface GlassIconsItem {
  icon: React.ReactElement;
  color?: string;
  label: string;
  customClass?: string;
  href?: string;
  onClick?: () => void;
}

interface GlassIconsProps {
  items: GlassIconsItem[];
  className?: string;
}

const GlassIcons: React.FC<GlassIconsProps> = ({ items, className }) => {
  return (
    <div className={`icon-btns ${className || ''}`}>
      {items.map((item, index) => {
        const handleClick = () => {
          if (item.onClick) {
            item.onClick();
          } else if (item.href) {
            window.open(item.href, '_blank', 'noopener,noreferrer');
          }
        };

        return (
          <button
            key={index}
            className={`icon-btn ${item.customClass || ''}`}
            aria-label={item.label}
            type="button"
            onClick={handleClick}
          >
            <span className="icon-btn__back" style={{ background: '#000000' }}></span>
            <span className="icon-btn__front">
              <span className="icon-btn__icon" aria-hidden="true">
                {item.icon}
              </span>
            </span>
            <span className="icon-btn__label">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default GlassIcons;
