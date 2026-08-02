import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCamera, FiX, FiChevronLeft, FiChevronRight, FiHeart, FiShare2, FiDownload, FiMaximize2 } from 'react-icons/fi';
import FadeIn from '@/components/animations/FadeIn';
import SectionHeading from '@/components/ui/SectionHeading';

/* ============================================
   DATA
   ============================================ */

const categories = [
  'All',
  'Wedding',
  'Pre-Wedding',
  'Portrait',
  'Fashion',
  'Product',
  'Food',
  'Baby',
  'Corporate',
  'Destination',
  'Cinematography',
];

const portfolioItems = [
  { id: 1, title: 'Royal Palace Romance', category: 'Wedding', aspect: 'tall', color: 'from-amber-900/50 to-rose-900/30' },
  { id: 2, title: 'Urban Fashion Edge', category: 'Fashion', aspect: 'wide', color: 'from-violet-900/50 to-indigo-900/30' },
  { id: 3, title: 'Newborn Bliss', category: 'Baby', aspect: 'square', color: 'from-pink-900/50 to-rose-900/30' },
  { id: 4, title: 'Sunset Pre-Wedding', category: 'Pre-Wedding', aspect: 'tall', color: 'from-orange-900/50 to-amber-900/30' },
  { id: 5, title: 'Gourmet Delight', category: 'Food', aspect: 'square', color: 'from-red-900/50 to-orange-900/30' },
  { id: 6, title: 'Diamond Collection', category: 'Product', aspect: 'wide', color: 'from-cyan-900/50 to-blue-900/30' },
  { id: 7, title: 'CEO Headshots', category: 'Corporate', aspect: 'square', color: 'from-slate-800/50 to-gray-900/30' },
  { id: 8, title: 'Destination Maldives', category: 'Destination', aspect: 'tall', color: 'from-teal-900/50 to-emerald-900/30' },
  { id: 9, title: 'Classic Portrait', category: 'Portrait', aspect: 'square', color: 'from-stone-800/50 to-neutral-900/30' },
  { id: 10, title: 'Mehendi Celebrations', category: 'Wedding', aspect: 'wide', color: 'from-green-900/50 to-emerald-900/30' },
  { id: 11, title: 'Couture Editorial', category: 'Fashion', aspect: 'tall', color: 'from-fuchsia-900/50 to-purple-900/30' },
  { id: 12, title: 'Luxury Watch', category: 'Product', aspect: 'square', color: 'from-zinc-800/50 to-slate-900/30' },
  { id: 13, title: 'Sangeet Night', category: 'Wedding', aspect: 'wide', color: 'from-yellow-900/50 to-amber-900/30' },
  { id: 14, title: 'Maternity Glow', category: 'Baby', aspect: 'tall', color: 'from-rose-900/50 to-pink-900/30' },
  { id: 15, title: 'Film Poster Shoot', category: 'Cinematography', aspect: 'tall', color: 'from-gray-900/50 to-black/30' },
  { id: 16, title: 'Beach Wedding', category: 'Destination', aspect: 'wide', color: 'from-sky-900/50 to-blue-900/30' },
  { id: 17, title: 'Street Food Culture', category: 'Food', aspect: 'square', color: 'from-orange-900/50 to-yellow-900/30' },
  { id: 18, title: 'Family Portrait', category: 'Portrait', aspect: 'square', color: 'from-amber-800/50 to-stone-900/30' },
];

/* ============================================
   LIGHTBOX
   ============================================ */

interface LightboxProps {
  item: typeof portfolioItems[0];
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const Lightbox = ({ item, onClose, onPrev, onNext }: LightboxProps) => {
  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Close */}
      <button
        className="absolute top-6 right-6 w-12 h-12 glass rounded-full flex items-center justify-center text-text hover:text-primary transition-colors z-10"
        onClick={onClose}
        aria-label="Close lightbox"
      >
        <FiX size={20} />
      </button>

      {/* Navigation */}
      <button
        className="absolute left-4 md:left-8 w-12 h-12 glass rounded-full flex items-center justify-center text-text hover:text-primary transition-colors z-10"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="Previous image"
      >
        <FiChevronLeft size={24} />
      </button>
      <button
        className="absolute right-4 md:right-8 w-12 h-12 glass rounded-full flex items-center justify-center text-text hover:text-primary transition-colors z-10"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="Next image"
      >
        <FiChevronRight size={24} />
      </button>

      {/* Image */}
      <motion.div
        className="w-full max-w-4xl mx-8 aspect-[4/3] rounded-2xl overflow-hidden"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`w-full h-full bg-gradient-to-br ${item.color}`}>
          <div className="w-full h-full flex items-center justify-center">
            <FiCamera size={80} className="text-primary/30" />
          </div>
        </div>
        {/* Info bar */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background/90 to-transparent">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-primary text-xs tracking-[0.2em] uppercase mb-1">{item.category}</p>
              <h3 className="text-2xl font-luxury text-text">{item.title}</h3>
            </div>
            <div className="flex gap-3">
              <button className="w-10 h-10 glass rounded-full flex items-center justify-center text-muted hover:text-primary transition-colors" aria-label="Like">
                <FiHeart size={16} />
              </button>
              <button className="w-10 h-10 glass rounded-full flex items-center justify-center text-muted hover:text-primary transition-colors" aria-label="Share">
                <FiShare2 size={16} />
              </button>
              <button className="w-10 h-10 glass rounded-full flex items-center justify-center text-muted hover:text-primary transition-colors" aria-label="Download">
                <FiDownload size={16} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ============================================
   PORTFOLIO PAGE
   ============================================ */

const PortfolioPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxItem, setLightboxItem] = useState<typeof portfolioItems[0] | null>(null);

  const filteredItems = activeCategory === 'All'
    ? portfolioItems
    : portfolioItems.filter((item) => item.category === activeCategory);

  const lightboxIndex = lightboxItem ? filteredItems.findIndex((i) => i.id === lightboxItem.id) : -1;

  const handlePrev = useCallback(() => {
    if (lightboxIndex > 0) setLightboxItem(filteredItems[lightboxIndex - 1]);
    else setLightboxItem(filteredItems[filteredItems.length - 1]);
  }, [lightboxIndex, filteredItems]);

  const handleNext = useCallback(() => {
    if (lightboxIndex < filteredItems.length - 1) setLightboxItem(filteredItems[lightboxIndex + 1]);
    else setLightboxItem(filteredItems[0]);
  }, [lightboxIndex, filteredItems]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial opacity-30" />
        <div className="container-premium relative text-center">
          <FadeIn>
            <h1 className="text-hero font-luxury text-text mb-4">
              Our <span className="text-gradient-gold italic">Portfolio</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-muted text-clamp-base max-w-2xl mx-auto">
              A curated collection of our finest work. Each image tells a story,
              each frame captures an emotion.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Category Filters */}
      <section className="pb-12">
        <div className="container-premium">
          <FadeIn>
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full text-sm transition-all duration-300 ${
                    activeCategory === cat
                      ? 'bg-primary text-background shadow-gold'
                      : 'glass text-muted hover:text-text hover:border-primary/30'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Masonry Grid */}
      <section className="pb-20">
        <div className="container-premium">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
            layout
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: i * 0.03 }}
                  className={`${
                    item.aspect === 'tall' ? 'row-span-2' :
                    item.aspect === 'wide' ? 'col-span-2' : ''
                  }`}
                >
                  <button
                    className="group relative w-full h-full rounded-xl overflow-hidden bg-card cursor-pointer"
                    onClick={() => setLightboxItem(item)}
                  >
                    <div className={`w-full ${
                      item.aspect === 'tall' ? 'aspect-[3/5]' :
                      item.aspect === 'wide' ? 'aspect-video' : 'aspect-square'
                    } bg-gradient-to-br ${item.color}`}>
                      <div className="w-full h-full flex items-center justify-center opacity-15">
                        <FiCamera size={36} className="text-primary" />
                      </div>
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-background/0 group-hover:bg-background/60 transition-all duration-400 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-4 group-hover:translate-y-0 text-center px-4">
                        <div className="w-10 h-10 rounded-full border border-primary/50 flex items-center justify-center mx-auto mb-3">
                          <FiMaximize2 className="text-primary" size={16} />
                        </div>
                        <p className="text-primary text-xs tracking-[0.15em] uppercase mb-1">{item.category}</p>
                        <h3 className="text-base font-luxury text-text">{item.title}</h3>
                      </div>
                    </div>
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxItem && (
          <Lightbox
            item={lightboxItem}
            onClose={() => setLightboxItem(null)}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PortfolioPage;
