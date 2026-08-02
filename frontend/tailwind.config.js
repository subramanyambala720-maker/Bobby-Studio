/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        /* Apple / Leica / Framer Pure Black & White Palette */
        background:   '#FFFFFF',
        'bg-alt':     '#FAFAFA',
        card:         '#FAFAFA',
        'card-alt':   '#F5F5F5',
        'card-hover': '#F3F3F3',

        /* Text Tokens */
        text:          '#000000',
        'text-sec':    '#333333',
        muted:         '#555555',
        'muted-light': '#888888',

        /* Primary Accent (Pure Black) */
        primary:         '#000000',
        'primary-light': '#222222',
        champagne:       '#000000',
        'champagne-hover':'#222222',
        beige:           '#F9F9F9',
        platinum:        '#EAEAEA',
        bronze:          '#555555',
        hover:           '#000000',
        secondary:       '#FFFFFF',

        /* Status */
        success: '#10B981',
        error:   '#EF4444',

        /* Glass & Borders */
        glass:         'rgba(255,255,255,0.9)',
        'glass-light': 'rgba(0,0,0,0.03)',
        'glass-border':'#EAEAEA',
        'border-champagne':'#EAEAEA',
      },

      fontFamily: {
        display: ['"Satoshi"', '"Space Grotesk"', 'sans-serif'],
        heading: ['"Satoshi"', '"Space Grotesk"', 'sans-serif'],
        body:    ['"Inter"', 'sans-serif'],
        luxury:  ['"Cormorant Garamond"', 'serif'],
      },

      fontSize: {
        'hero':     ['clamp(0.95rem, 1.75vw, 1.45rem)', { lineHeight: '1.25', letterSpacing: '0.02em' }],
        'display':  ['clamp(0.9rem, 1.5vw, 1.3rem)',    { lineHeight: '1.2', letterSpacing: '0.01em' }],
        'title':    ['clamp(0.85rem, 1.2vw, 1.1rem)',   { lineHeight: '1.25' }],
        'subtitle': ['clamp(0.75rem, 1.0vw, 0.85rem)',  { lineHeight: '1.6' }],
      },

      backgroundImage: {
        'gradient-gold':      'linear-gradient(135deg, #000000 0%, #333333 100%)',
        'gradient-champagne': 'linear-gradient(135deg, #000000 0%, #222222 100%)',
        'gradient-dark':      'linear-gradient(180deg, #FFFFFF 0%, #FAFAFA 100%)',
        'gradient-glass':     'linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(250,250,250,1) 100%)',
        'gradient-radial':   'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0,0,0,0.04) 0%, transparent 70%)',
      },

      boxShadow: {
        'gold':       '0 15px 40px rgba(0,0,0,0.08)',
        'gold-sm':    '0 4px 20px rgba(0,0,0,0.04)',
        'gold-lg':    '0 25px 60px rgba(0,0,0,0.12)',
        'card':       '0 10px 30px rgba(0,0,0,0.05)',
        'card-hover': '0 20px 40px rgba(0,0,0,0.1)',
        'glass':      '0 8px 32px 0 rgba(0, 0, 0, 0.05)',
      },

      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
    },
  },
  plugins: [],
};
