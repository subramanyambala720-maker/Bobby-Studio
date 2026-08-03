import { motion } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-white text-[#000000]"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      onAnimationComplete={onComplete}
    >
      <div className="relative flex flex-col items-center gap-6">
        {/* Logo Mark */}
        <motion.div
          className="relative"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
        >
          <div className="w-20 h-20 md:w-24 md:h-24 border-2 border-black rounded-full flex items-center justify-center relative">
            <motion.span
              className="text-3xl md:text-4xl font-luxury text-[#000000] font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              B
            </motion.span>
            {/* Orbiting black dot */}
            <motion.div
              className="absolute w-2.5 h-2.5 bg-black rounded-full"
              style={{ top: '-5px', left: '50%', marginLeft: '-5px' }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              initial={false}
            />
          </div>
        </motion.div>

        {/* Studio Name */}
        <div className="overflow-hidden">
          <motion.h1
            className="text-2xl md:text-3xl font-luxury tracking-[0.3em] text-[#000000] uppercase"
            initial={{ y: 60 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.6 }}
          >
            BOBBY STUDIO
          </motion.h1>
        </div>

        {/* Tagline */}
        <motion.p
          className="text-xs text-[#555555] tracking-[0.3em] uppercase font-display"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          Luxury Photography & Cinematography
        </motion.p>

      </div>
    </motion.div>
  );
};

export default Preloader;
