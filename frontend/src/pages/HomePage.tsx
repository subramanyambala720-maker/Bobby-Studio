import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FiArrowRight, FiArrowUpRight, FiPlay, FiCamera, FiHeart, FiStar,
  FiAward, FiUsers, FiCalendar, FiFilm, FiImage, FiMapPin, FiX,
  FiCheck, FiMessageSquare, FiTrendingUp, FiCheckCircle,
  FiChevronLeft, FiChevronRight
} from 'react-icons/fi';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
// @ts-ignore
import 'swiper/css';
// @ts-ignore
import 'swiper/css/effect-fade';
// @ts-ignore
import 'swiper/css/pagination';

import FadeIn from '@/components/animations/FadeIn';
import FloatingCard from '@/components/animations/FloatingCard';
import MagneticElement from '@/components/animations/MagneticElement';
import Button from '@/components/ui/Button';
import SectionHeading from '@/components/ui/SectionHeading';

/* ============================================
   DATA DEFINITIONS
   ============================================ */

const stats = [
  { number: 15, suffix: '+', label: 'Years Experience', icon: FiCalendar },
  { number: 5000, suffix: '+', label: 'Happy Clients', icon: FiUsers },
  { number: 50, suffix: '+', label: 'Design Awards', icon: FiAward },
  { number: 99, suffix: '%', label: 'Satisfaction Rate', icon: FiStar },
];

const allServices = [
  { title: 'Wedding Photography', category: 'Wedding', desc: 'Timeless luxury moments captured with cinematic elegance & art direction.', icon: FiHeart, image: '/images/wedding_photography.jpg' },
  { title: 'Pre Wedding', category: 'Couples', desc: 'Romantic visual stories set in iconic destinations around the world.', icon: FiCamera, image: '/images/pre_wedding_service.jpg' },
  { title: 'Engagement', category: 'Couples', desc: 'Capturing the beginning of your forever with authentic emotion.', icon: FiHeart, image: '/images/engagement_service.jpg' },
  { title: 'Maternity', category: 'Family', desc: 'Celebrating new life with artistic, glowing portrait sessions.', icon: FiStar, image: '/images/maternity_service.jpg' },
  { title: 'Baby Shoot', category: 'Family', desc: 'Precious newborn & baby portraiture handled with tender care.', icon: FiHeart, image: '/images/baby_shoot_service.jpg' },
  { title: 'Birthday', category: 'Events', desc: 'Milestone birthday celebrations documented with vibrant energy.', icon: FiStar, image: '/images/birthday_service.jpg' },
  { title: 'Drone Photography', category: 'Cinematography', desc: 'Breathtaking 4K aerial imagery capturing grandeur from above.', icon: FiMapPin, image: '/images/drone_service.jpg' },
];

const portfolioCategories = ['All', 'Wedding', 'Pre Wedding', 'Baby', 'Corporate', 'Drone', 'Product', 'Interior'];

const portfolioItems = [
  { id: 4, title: 'Newborn Dreams', category: 'Baby', color: 'from-pink-900/70 to-rose-900/50', aspect: 'tall' },
  { id: 5, title: 'CEO Executive Branding', category: 'Corporate', color: 'from-slate-800/70 to-gray-900/50', aspect: 'square' },
  { id: 6, title: 'Aerial View of Lake Palace', category: 'Drone', color: 'from-sky-900/70 to-blue-900/50', aspect: 'wide' },
  { id: 7, title: 'Diamond Collection 2026', category: 'Product', color: 'from-zinc-800/70 to-slate-900/50', aspect: 'square' },
  { id: 8, title: 'Heritage Haveli Architecture', category: 'Interior', color: 'from-amber-900/70 to-yellow-900/50', aspect: 'tall' },
];

const videoShowcase = [
  {
    id: 1,
    title: 'The Royal Wedding Film — Aria & Vihaan',
    location: 'Udaipur Palace',
    duration: '4:20',
    youtubeUrl: 'https://youtu.be/6ABes0mjhMw?si=RUeK6p7bIqQ0PHrP',
    thumbnail: 'https://img.youtube.com/vi/6ABes0mjhMw/hqdefault.jpg'
  },
  {
    id: 2,
    title: 'Sunset Magic in Goa — Pre-Wedding Film',
    location: 'Goa Coast',
    duration: '3:15',
    youtubeUrl: 'https://youtu.be/uutZgpAoYE0?si=FwKN3re6AhVrpVC9',
    thumbnail: 'https://img.youtube.com/vi/uutZgpAoYE0/hqdefault.jpg'
  },
  {
    id: 3,
    title: 'Jaipur Heritage Celebration',
    location: 'Jaipur Fort',
    duration: '5:40',
    youtubeUrl: 'https://youtu.be/9dFYoAN_amQ?si=CRVooh0gCVpzXU08',
    thumbnail: 'https://img.youtube.com/vi/9dFYoAN_amQ/hqdefault.jpg'
  },
];

const whyChooseUs = [
  { title: 'Award Winning Team', desc: 'Recognized with 150+ national & international photography awards.', icon: FiAward },
  { title: '4K Cinematic Videos', desc: 'Shot on Cinema Line cameras with color grading by expert colorists.', icon: FiFilm },
  { title: 'Professional Editors', desc: 'In-house post-production team delivering magazine-ready retouches.', icon: FiStar },
  { title: 'Fast Delivery', desc: 'Sneak peek photos in 48 hours and final gallery in 2-3 weeks.', icon: FiTrendingUp },
  { title: 'Premium Albums', desc: 'Handcrafted Italian leather flush-mount albums imported from Milan.', icon: FiImage },
  { title: 'Drone Coverage', desc: 'Licensed FAA/DGCA drone operators for legal 4K aerial shots.', icon: FiMapPin },
  { title: 'Creative Storytelling', desc: 'Documentary candid approach that captures raw, genuine emotions.', icon: FiHeart },
  { title: 'Luxury Experience', desc: 'Dedicated concierge manager for seamless coordination.', icon: FiUsers },
];

const packagesList = [
  {
    name: 'Silver', tier: 'Essential', price: '₹49,999', originalPrice: '₹59,999', popular: false,
    features: ['Half Day Coverage (6 Hours)', 'One Senior Photographer', '300+ Color Edited Photos', 'Online Digital Gallery', 'Digital Delivery in 14 Days', 'Pre-Shoot Consultation']
  },
  {
    name: 'Gold', tier: 'Most Popular', price: '₹99,999', originalPrice: '₹1,29,999', popular: true,
    features: ['Full Day Coverage (12 Hours)', 'Two Senior Photographers', '500+ Color Edited Photos', '4K Cinematic Highlight Film (5 min)', 'Drone Aerial Coverage', 'Handcrafted Leather Album (40 Pages)', 'USB & Digital Delivery']
  },
  {
    name: 'Platinum', tier: 'Luxury', price: '₹1,49,999', originalPrice: '₹1,79,999', popular: false,
    features: ['2-Day Full Event Coverage', '3 Photographers + 2 Cinematographers', '800+ Edited Photos', 'Full Wedding Documentary Film (20 min)', '4K Drone Aerial Coverage', '2 Premium Italian Albums', 'Same-Day Reel Edit for Socials']
  },
  {
    name: 'Diamond', tier: 'Royal Edition', price: '₹2,49,999', originalPrice: '₹2,99,999', popular: false,
    features: ['Unlimited Multi-Day Coverage', 'Full Master Team of 8 Artists', 'Unlimited Edited Photos', 'Cinematic Feature Film + Teaser', 'Unlimited Drone Flights', '3 Italian Albums + Mini Albums', 'Live HD Streaming', 'Pre-Wedding Shoot Included']
  },
];

const testimonials = [
  { name: 'Priya & Vihaan Sharma', role: 'Bride & Groom', image: 'P', text: 'Bobby Studio transformed our Udaipur wedding into an absolute fairy tale. The candid shots bring tears to our eyes every time we look at them. World-class team!', rating: 5 },
  { name: 'Rohan Mehta', role: 'Corporate Marketing Director', image: 'R', text: 'The level of professionalism, lighting mastery, and speed of delivery is unmatched. Bobby Studio handles our commercial campaigns with perfection.', rating: 5 },
  { name: 'Ananya & Kabir', role: 'Pre-Wedding Couple', image: 'A', text: 'Our Goa pre-wedding shoot with Bobby Studio was the highlight of our engagement. The drone shots and video teaser give us goosebumps!', rating: 5 },
];

const instagramPosts = [
  { id: 1, likes: '1.4k', comments: '124', label: 'Royal Wedding Udaipur' },
  { id: 2, likes: '2.8k', comments: '210', label: 'Goa Beach Sunset' },
  { id: 3, likes: '980', comments: '88', label: 'Vogue Editorial' },
  { id: 4, likes: '3.1k', comments: '340', label: 'Bride Portrait' },
  { id: 5, likes: '1.9k', comments: '156', label: 'Sunset Couple Shot' },
  { id: 6, likes: '4.2k', comments: '512', label: 'Jaipur Fort Aerial' },
];

const latestBlogs = [
  { id: 1, title: 'How to Prepare for Your Wedding Photography Session', category: 'Wedding Tips', date: 'Jan 15, 2026', readTime: '7 min read', excerpt: 'Essential secrets to feeling natural on camera and getting breathtaking candid shots on your big day.' },
  { id: 2, title: 'The Magic of Golden Hour Lighting in Destination Shoots', category: 'Photography Art', date: 'Jan 08, 2026', readTime: '5 min read', excerpt: 'How we harness natural sunlight to create glowing, magical portraits that stand the test of time.' },
  { id: 3, title: 'Behind the Scenes: 3-Day Royal Wedding at City Palace Udaipur', category: 'Behind the Scenes', date: 'Dec 28, 2025', readTime: '10 min read', excerpt: 'Go behind the lens with our 12-member crew as we captured one of India\'s grandest weddings.' },
];

/* ============================================
   HERO SECTION COMPONENT
   ============================================ */

const heroImages = [
  '/images/hero_slider_1.jpg',
  '/images/hero_slider_2.jpg',
  '/images/hero_slider_3.jpg',
  '/images/hero_slider_4.jpg',
  '/images/hero_slider_5.jpg',
];

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Preload all 5 images on mount
  useEffect(() => {
    heroImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Auto-play slideshow every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <motion.section
      ref={heroRef}
      className="relative min-h-screen pt-36 pb-24 flex items-center justify-center overflow-hidden bg-black text-white group"
      style={{ opacity: heroOpacity }}
    >
      {/* Fullscreen Hero Background Slider — 5 Uploaded Images with Crossfade & Ken Burns Zoom */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="sync">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1.05 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1.3, ease: 'easeInOut' },
              scale: { duration: 3.5, ease: 'easeOut' },
            }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={heroImages[currentSlide]}
              alt={`Bobby Studio Showcase ${currentSlide + 1}`}
              className="w-full h-full object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>

        {/* Subtle Dark Gradient Overlay (25-35% opacity for text legibility while preserving image brilliance) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-black/75 z-10 pointer-events-none" />
      </div>

      {/* Fixed Hero Content — Unaffected by Image Slideshow Transitions */}
      <div className="relative z-20 container-premium text-center px-4 max-w-4xl mx-auto">
        {/* Main Heading — Perfect 2-Line Layout */}
        <div className="mb-1">
          <motion.h1
            className="text-hero font-luxury text-white leading-[1.1] font-semibold drop-shadow-md whitespace-nowrap"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.35 }}
          >
            Every Moment Deserves
          </motion.h1>
        </div>
        <div className="mb-8">
          <motion.h1
            className="text-hero font-luxury leading-[1.1] whitespace-nowrap"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.45 }}
          >
            <span className="text-white italic font-bold drop-shadow-lg">
              Timeless Perfection
            </span>
          </motion.h1>
        </div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          {/* Primary Button — Pure White */}
          <MagneticElement>
            <Link to="/book">
              <button className="px-7 py-3.5 bg-white text-black text-[11px] font-display font-semibold tracking-[0.2em] rounded-full transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_40px_rgba(255,255,255,0.4)] hover:scale-105 uppercase flex items-center gap-2">
                <span>Book Your Session</span>
                <FiCalendar size={14} />
              </button>
            </Link>
          </MagneticElement>

          {/* Secondary Button — Glass White Border */}
          <MagneticElement>
            <Link to="/gallery">
              <button className="px-7 py-3.5 bg-black/30 backdrop-blur-md border border-white/50 text-white hover:bg-white hover:text-black text-[11px] font-display font-semibold tracking-[0.2em] rounded-full transition-all duration-500 uppercase flex items-center gap-2">
                <span>Explore Gallery</span>
                <FiArrowRight size={14} />
              </button>
            </Link>
          </MagneticElement>
        </motion.div>
      </div>

      {/* Prev / Next Minimal Glass Arrow Controls (Hidden until hover) */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 hover:scale-110 hover:bg-white hover:text-black transition-all duration-300"
        aria-label="Previous slide"
      >
        <FiChevronLeft size={22} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 hover:scale-110 hover:bg-white hover:text-black transition-all duration-300"
        aria-label="Next slide"
      >
        <FiChevronRight size={22} />
      </button>

      {/* Showreel Video Modal */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsVideoModalOpen(false)}
          >
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white flex items-center justify-center text-black hover:scale-110 transition-transform z-10"
            >
              <FiX size={24} />
            </button>
            <motion.div
              className="w-full max-w-4xl aspect-video rounded-2xl overflow-hidden bg-black border border-white/20 relative shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src="https://www.youtube.com/embed/6ABes0mjhMw?autoplay=1"
                title="Bobby Studio 4K Showreel"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

/* ============================================
   STATISTICS SECTION
   ============================================ */

const StatsSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section className="relative py-20 bg-[#FAFAFA] border-y border-[#EAEAEA]">
      <div ref={ref} className="container-premium">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
          {stats.map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 0.1} className="h-full">
              <div className="bg-white border border-[#EAEAEA] p-6 rounded-2xl text-center hover:border-[#000000] transition-all duration-500 hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 h-full flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-[#FAFAFA] border border-[#EAEAEA] flex items-center justify-center mb-3">
                  <stat.icon className="text-[#000000]" size={20} />
                </div>
                <div className="text-3xl md:text-4xl font-display font-bold text-[#000000] mb-1">
                  {inView ? (
                    <CountUp end={stat.number} duration={2.5} decimals={0} separator="," />
                  ) : (
                    '0'
                  )}
                  <span className="text-[#000000]">{stat.suffix}</span>
                </div>
                <p className="text-[#555555] text-xs tracking-wider uppercase font-medium">{stat.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ============================================
   ABOUT BOBBY STUDIO SECTION
   ============================================ */

const AboutSection = () => {
  return (
    <section className="section-padding bg-white overflow-hidden">
      <div className="container-premium">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Pre-Wedding Photo Card */}
          <FadeIn direction="left">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-[#FAFAFA] border border-[#EAEAEA] group shadow-xl">
              <img
                src="/images/about_studio_story.png"
                alt="Bobby Studio Pre-Wedding Photography"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/90 rounded-2xl border border-[#EAEAEA] backdrop-blur-xl">
                <p className="text-[#000000] text-xs font-display tracking-[0.25em] uppercase mb-1 font-semibold">Pre-Wedding • Romance</p>
                <h4 className="text-[#000000] font-luxury text-xl font-semibold">Capturing Pure Emotion</h4>
              </div>
              <div className="absolute top-6 left-6 px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-xs text-[#000000] font-display font-semibold uppercase tracking-wider border border-[#EAEAEA]">
                Est. 2012
              </div>
              <div className="absolute top-6 right-6 px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-xs text-[#000000] font-display border border-[#EAEAEA]">
                50+ Awards
              </div>
            </div>
          </FadeIn>

          {/* Right: Content */}
          <FadeIn direction="right">
            <div>
              <p className="text-xs text-[#555555] tracking-[0.25em] uppercase font-display mb-3">About Bobby Studio</p>
              <h2 className="text-display font-luxury text-[#000000] mb-6 leading-tight font-semibold">
                Crafting Memories That{' '}
                <span className="italic font-bold">Last Forever</span>
              </h2>
              <p className="text-[#555555] text-clamp-base leading-relaxed mb-6 font-light">
                Bobby Studio is a premium photography brand specializing in weddings, pre-weddings, maternity, baby shoots, fashion, commercial photography, cinematography, and luxury storytelling.
              </p>
              <p className="text-[#555555] text-sm leading-relaxed mb-8 font-light">
                With over a decade of excellence, our team of 25+ master photographers, filmmakers, and colorists have documented over 350 luxury weddings across Udaipur, Jaipur, Goa, Kerala, and international destinations.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Link to="/about">
                  <button className="px-8 py-3.5 bg-[#000000] text-[#FFFFFF] text-xs font-display font-semibold tracking-[0.2em] rounded-full transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.12)] hover:scale-105 uppercase flex items-center gap-2">
                    <span>Discover Our Story</span>
                    <FiArrowRight size={15} />
                  </button>
                </Link>
                <Link to="/gallery">
                  <button className="px-8 py-3.5 bg-[#FFFFFF] border border-[#000000] text-[#000000] hover:bg-[#000000] hover:text-[#FFFFFF] text-xs font-display font-semibold tracking-[0.2em] rounded-full transition-all duration-500 uppercase">
                    View Recent Works
                  </button>
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

/* ============================================
   PREMIUM SERVICES SECTION
   ============================================ */

const ServicesSection = () => {
  return (
    <section className="section-padding bg-[#FAFAFA]">
      <div className="container-premium">
        <SectionHeading
          label="Our Services"
          title="World-Class Photography &"
          titleAccent="Filmmaking"
          description="A complete suite of luxury visual services tailored to immortalize your most precious moments."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allServices.map((service, i) => (
            <FadeIn key={service.title} delay={i * 0.05}>
              <FloatingCard intensity={3}>
                <div className="group h-full bg-white border border-[#EAEAEA] rounded-2xl overflow-hidden hover:border-[#000000] transition-all duration-500 hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)] flex flex-col">
                  {/* Card Header Photo or Icon */}
                  <div className="relative h-48 bg-[#FAFAFA] border-b border-[#EAEAEA] flex items-center justify-center overflow-hidden">
                    {service.image ? (
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    ) : (
                      <service.icon size={44} className="text-[#000000] group-hover:scale-110 transition-transform duration-500" />
                    )}
                    <div className="absolute top-3 right-3 px-2.5 py-1 bg-white/90 backdrop-blur-md border border-[#EAEAEA] rounded-full text-[10px] text-[#000000] tracking-wider uppercase font-semibold shadow-sm">
                      {service.category}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-lg font-luxury text-[#000000] font-bold mb-2 group-hover:text-[#000000] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-[#555555] text-xs leading-relaxed mb-6 flex-1 font-light">
                      {service.desc}
                    </p>
                    <Link
                      to="/services"
                      className="inline-flex items-center gap-2 text-xs font-display font-semibold text-[#000000] group-hover:gap-3 transition-all duration-300 pt-4 border-t border-[#EAEAEA]"
                    >
                      <span>Explore Service</span>
                      <FiArrowUpRight size={14} />
                    </Link>
                  </div>
                </div>
              </FloatingCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ============================================
   FEATURED PORTFOLIO SECTION
   ============================================ */

const PortfolioSection = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredItems = activeCategory === 'All'
    ? portfolioItems
    : portfolioItems.filter((i) => i.category === activeCategory);

  return (
    <section className="section-padding bg-white">
      <div className="container-premium">
        <SectionHeading
          label="Featured Portfolio"
          title="Curated Luxury"
          titleAccent="Gallery"
          description="Handpicked moments of emotion, beauty, and grandeur captured through our lenses."
        />

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {portfolioCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-display transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-primary text-background shadow-gold'
                  : 'glass text-muted hover:text-text'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" layout>
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                className={`${item.aspect === 'wide' ? 'sm:col-span-2' : ''}`}
              >
                <Link to="/gallery" className="group relative block rounded-2xl overflow-hidden bg-card">
                  <div className={`w-full ${
                    item.aspect === 'tall' ? 'aspect-[3/4]' :
                    item.aspect === 'wide' ? 'aspect-video' : 'aspect-square'
                  } bg-gradient-to-br ${item.color} flex items-center justify-center p-6`}>
                    <FiCamera size={40} className="text-white/20 group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white">
                      <p className="text-amber-300 text-xs tracking-wider uppercase mb-1">{item.category}</p>
                      <h4 className="text-base font-luxury text-white font-semibold">{item.title}</h4>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

/* ============================================
   CINEMATIC VIDEO SHOWCASE SECTION
   ============================================ */

const VideoShowcaseSection = () => {
  return (
    <section className="section-padding bg-white text-[#000000] overflow-hidden">
      <div className="container-premium">
        <SectionHeading
          label="Cinematography"
          title="4K Cinema"
          titleAccent="Films"
          description="Immerse yourself in our Hollywood-grade 4K wedding films and cinematic highlights."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {videoShowcase.map((video, i) => (
            <FadeIn key={video.id} delay={i * 0.15}>
              <a
                href={video.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group block relative rounded-2xl overflow-hidden bg-[#FAFAFA] border border-[#EAEAEA] hover:border-black/40 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1.5"
              >
                {/* Thumbnail Image Header */}
                <div className="aspect-video relative overflow-hidden bg-black">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />

                  {/* Play Button — Perfectly Centered */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-16 h-16 rounded-full bg-white/90 backdrop-blur-md border border-white flex items-center justify-center text-black shadow-xl group-hover:scale-110 group-hover:bg-black group-hover:text-white transition-all duration-300">
                    <FiPlay size={24} className="ml-1" />
                  </div>

                  <span className="absolute top-4 right-4 z-10 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-xs text-white font-display border border-white/20">
                    {video.duration}
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-6 bg-[#FAFAFA]">
                  <p className="text-[#555555] text-xs tracking-wider uppercase mb-1 font-display font-medium">{video.location}</p>
                  <h3 className="text-lg font-luxury text-[#000000] font-bold mb-4 group-hover:text-black transition-colors">{video.title}</h3>
                  <div className="inline-flex items-center gap-2 text-xs font-display font-semibold text-[#000000] group-hover:translate-x-1 transition-transform">
                    <span>Watch Full Film on YouTube</span>
                    <FiArrowRight size={14} />
                  </div>
                </div>
              </a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ============================================
   WHY CHOOSE BOBBY STUDIO
   ============================================ */

const WhyChooseSection = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container-premium">
        <SectionHeading
          label="The Bobby Studio Standard"
          title="Why Choose"
          titleAccent="Bobby Studio"
          description="Our relentless pursuit of perfection, technology, and art sets us apart."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyChooseUs.map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.08}>
              <div className="p-6 glass rounded-2xl text-center hover:border-primary/30 transition-all duration-300 hover:shadow-gold h-full flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                  <item.icon size={24} />
                </div>
                <h3 className="text-base font-luxury text-text font-bold mb-2">{item.title}</h3>
                <p className="text-muted text-xs leading-relaxed">{item.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ============================================
   PACKAGES SECTION
   ============================================ */

const PackagesSection = () => {
  return (
    <section className="section-padding bg-gray-50/50">
      <div className="container-premium">
        <SectionHeading
          label="Transparent Investment"
          title="Luxury Photography"
          titleAccent="Packages"
          description="Transparent, value-packed investment options designed for every celebration."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packagesList.map((pkg, i) => (
            <FadeIn key={pkg.name} delay={i * 0.1}>
              <FloatingCard intensity={3}>
                <div className={`relative h-full glass rounded-2xl p-6 flex flex-col transition-all duration-300 ${
                  pkg.popular ? 'border-2 border-primary shadow-gold bg-white' : ''
                }`}>
                  {pkg.popular && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-gradient-gold text-background text-[10px] font-bold uppercase tracking-widest rounded-full shadow-gold">
                      Most Popular
                    </div>
                  )}

                  <div className="mb-4">
                    <p className="text-xs text-primary tracking-wider uppercase font-display">{pkg.tier}</p>
                    <h3 className="text-2xl font-luxury text-text font-bold">{pkg.name}</h3>
                  </div>

                  <div className="mb-6 pb-6 border-b border-glass-border">
                    <span className="text-3xl font-display font-bold text-text">{pkg.price}</span>
                    {pkg.originalPrice && (
                      <span className="text-xs text-muted line-through ml-2">{pkg.originalPrice}</span>
                    )}
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-xs text-muted">
                        <FiCheckCircle size={14} className="text-primary flex-shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Link to="/book" className="block mt-auto">
                    <Button variant={pkg.popular ? 'primary' : 'glass'} fullWidth size="md">
                      Book {pkg.name}
                    </Button>
                  </Link>
                </div>
              </FloatingCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ============================================
   TESTIMONIALS CAROUSEL
   ============================================ */

const TestimonialsSection = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container-premium">
        <SectionHeading
          label="Cherished Words"
          title="What Our Clients"
          titleAccent="Say"
          description="Love stories told by the couples and brands who trusted us."
        />

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="!pb-12"
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={i}>
              <div className="glass p-8 rounded-2xl h-full flex flex-col justify-between">
                <div>
                  <div className="flex gap-1 mb-4 text-amber-400">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <FiStar key={j} size={14} className="fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-text/80 text-sm leading-relaxed italic mb-6">&ldquo;{t.text}&rdquo;</p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-glass-border">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-luxury font-bold text-primary">
                    {t.image}
                  </div>
                  <div>
                    <h4 className="text-sm font-luxury text-text font-bold">{t.name}</h4>
                    <p className="text-xs text-muted">{t.role}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

/* ============================================
   INSTAGRAM FEED SECTION
   ============================================ */

const InstagramSection = () => {
  return (
    <section className="py-16 bg-gray-50/50">
      <div className="container-premium text-center mb-10">
        <p className="text-xs text-primary tracking-[0.25em] uppercase font-display mb-2">Follow Our Journey</p>
        <h2 className="text-title font-luxury text-text">
          @bobbystudio on <span className="text-gradient-gold italic">Instagram</span>
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 px-2">
        {instagramPosts.map((post) => (
          <a
            key={post.id}
            href="https://instagram.com/bobbystudio"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-square bg-neutral-900 rounded-xl overflow-hidden block"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-900/60 to-black flex items-center justify-center p-4">
              <FaInstagram size={32} className="text-white/30 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white text-xs font-display">
              <div className="text-center p-2">
                <FiHeart className="mx-auto mb-1 text-rose-400" size={16} />
                <span>{post.likes}</span>
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="text-center mt-8">
        <a
          href="https://instagram.com/bobbystudio"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-gold text-background text-xs font-display font-semibold tracking-wider rounded-full shadow-gold uppercase"
        >
          <FaInstagram size={14} /> Follow Bobby Studio
        </a>
      </div>
    </section>
  );
};

/* ============================================
   LATEST BLOGS SECTION
   ============================================ */

const BlogsSection = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container-premium">
        <SectionHeading
          label="Journal & Insights"
          title="Latest From Our"
          titleAccent="Blog"
          description="Photography tips, destination guides, and behind-the-scenes stories."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {latestBlogs.map((blog, i) => (
            <FadeIn key={blog.id} delay={i * 0.15}>
              <Link to={`/blog`} className="group flex flex-col h-full glass rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-300 hover:shadow-gold">
                <div className="aspect-video bg-gradient-to-br from-amber-950/60 to-neutral-900 flex items-center justify-center p-6 relative">
                  <FiImage size={40} className="text-white/20 group-hover:scale-110 transition-transform duration-500" />
                  <span className="absolute top-4 left-4 px-3 py-1 glass rounded-full text-[10px] text-primary tracking-wider uppercase">
                    {blog.category}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center justify-between text-[11px] text-muted mb-3">
                    <span>{blog.date}</span>
                    <span>{blog.readTime}</span>
                  </div>
                  <h3 className="text-base font-luxury text-text font-bold mb-3 group-hover:text-primary transition-colors flex-1">
                    {blog.title}
                  </h3>
                  <p className="text-muted text-xs leading-relaxed mb-4 line-clamp-2">{blog.excerpt}</p>
                  <div className="inline-flex items-center gap-2 text-xs font-display text-primary font-semibold group-hover:gap-3 transition-all duration-300 pt-3 border-t border-glass-border">
                    <span>Read Article</span>
                    <FiArrowRight size={14} />
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ============================================
   CONTACT CTA SECTION
   ============================================ */

const ContactCTASection = () => {
  return (
    <section className="section-padding bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-amber-950/40 via-neutral-900 to-black opacity-80" />
      <div className="container-premium relative z-10 text-center">
        <FadeIn>
          <p className="text-xs text-amber-400 tracking-[0.25em] uppercase font-display mb-4">Start Your Story</p>
          <h2 className="text-display font-luxury text-white mb-6 max-w-3xl mx-auto">
            Let's Create Something <span className="text-gradient-gold italic">Beautiful Together</span>
          </h2>
          <p className="text-white/70 text-clamp-base max-w-xl mx-auto mb-10 font-light">
            Book your dream photography session with Bobby Studio. Our team is ready to capture your moments with timeless perfection.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/book">
              <Button variant="primary" size="lg" icon={<FiCalendar />}>
                Book Your Session
              </Button>
            </Link>
            <a
              href="https://wa.me/919876543210?text=Hi%20Bobby%20Studio!%20I'm%20ready%20to%20book%20a%20shoot."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 glass rounded-full text-white text-sm font-display font-semibold tracking-wider hover:bg-white/20 transition-all duration-300"
            >
              <FaWhatsapp size={18} className="text-green-400" />
              Chat on WhatsApp
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

/* ============================================
   MAIN HOMEPAGE CONTAINER
   ============================================ */

const HomePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <ServicesSection />
      <PortfolioSection />
      <VideoShowcaseSection />
      <WhyChooseSection />
      <PackagesSection />
      <TestimonialsSection />
      <InstagramSection />
      <BlogsSection />
      <ContactCTASection />
    </motion.div>
  );
};

export default HomePage;
