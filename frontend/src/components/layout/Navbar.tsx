import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineMenuAlt4, HiX } from 'react-icons/hi';
import { FiSearch, FiPhone, FiMail, FiInstagram, FiArrowRight } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Packages', path: '/packages' },
  { name: 'Contact', path: '/contact' },
];

const searchQuickLinks = [
  { name: 'Wedding Photography', category: 'Services', path: '/services' },
  { name: 'Pre-Wedding Shoots', category: 'Services', path: '/services' },
  { name: 'Gold Wedding Package', category: 'Packages', path: '/packages' },
  { name: 'Udaipur Royal Wedding', category: 'Gallery', path: '/gallery' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
    setIsSearchOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = (isMobileOpen || isSearchOpen) ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen, isSearchOpen]);

  const filteredQuickLinks = searchQuery === ''
    ? searchQuickLinks
    : searchQuickLinks.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.category.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'py-4 bg-white/95 backdrop-blur-xl border-b border-[#EAEAEA] shadow-[0_4px_20px_rgba(0,0,0,0.04)]'
            : 'py-6 bg-white/80 backdrop-blur-md border-b border-[#EAEAEA]'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="w-full px-6 md:px-12 lg:px-16 flex items-center justify-between">
          {/* Logo — Far Left with Large Margin to Home */}
          <Link to="/" className="relative z-10 flex items-center gap-3.5 group flex-shrink-0 mr-12 lg:mr-24 xl:mr-32" aria-label="Bobby Studio Home">
            <div className="w-11 h-11 border border-[#000000] bg-transparent rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-[#000000] group-hover:text-white">
              <span className="text-xl font-luxury font-bold text-[#000000] group-hover:text-white transition-colors">B</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-luxury tracking-[0.2em] font-bold text-[#000000] leading-none">
                BOBBY STUDIO
              </span>
              <span className="text-[9px] tracking-[0.35em] uppercase text-[#555555] leading-none mt-1.5 font-medium">
                Luxury Photography
              </span>
            </div>
          </Link>

          {/* Right Pushed Navigation & Actions Container */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8 ml-auto">
            {/* Navigation Links — Placed with spacious gap from logo */}
            <nav className="flex items-center gap-2 xl:gap-4" aria-label="Main navigation">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`relative px-3.5 py-2 text-sm tracking-widest transition-colors duration-300 ${
                      isActive
                        ? 'text-[#000000] font-semibold'
                        : 'text-[#555555] hover:text-[#000000]'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div
                        className="absolute bottom-0 left-3.5 right-3.5 h-[2px] bg-[#000000] rounded-full"
                        layoutId="navbar-underline"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Divider */}
            <div className="h-6 w-[1px] bg-[#EAEAEA]" />

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="w-10 h-10 rounded-full border border-[#EAEAEA] bg-[#FAFAFA] text-[#000000] hover:bg-[#F3F3F3] hover:border-[#000000] flex items-center justify-center transition-all duration-300"
                aria-label="Open search"
              >
                <FiSearch size={16} />
              </button>

              {/* WhatsApp Icon */}
              <a
                href="https://wa.me/919876543210?text=Hi%20Bobby%20Studio!%20I%20would%20like%20to%20inquire%20about%20your%20photography%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-[#EAEAEA] bg-[#FAFAFA] text-[#000000] hover:bg-[#F3F3F3] hover:border-[#000000] flex items-center justify-center transition-all duration-300"
                aria-label="Chat on WhatsApp"
              >
                <FaWhatsapp size={18} />
              </a>

              {/* Primary Button */}
              <Link
                to="/book"
                className="relative group overflow-hidden px-7 py-3.5 bg-[#000000] text-[#FFFFFF] text-xs font-display font-semibold tracking-[0.2em] rounded-full transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.15)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.25)] hover:scale-[1.05] uppercase active:scale-95 flex items-center gap-2 flex-shrink-0"
              >
                <span className="relative z-10 flex items-center gap-2">
                  BOOK NOW
                  <FiArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full shimmer-effect" />
              </Link>
            </div>
          </div>

          {/* Mobile Hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-[#000000]"
              aria-label="Open search"
            >
              <FiSearch size={22} />
            </button>
            <button
              className="relative z-10 p-2 text-[#000000]"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileOpen}
            >
              {isMobileOpen ? <HiX size={28} /> : <HiOutlineMenuAlt4 size={28} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xl flex items-start justify-center pt-24 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSearchOpen(false)}
          >
            <motion.div
              className="w-full max-w-2xl bg-white rounded-3xl p-6 md:p-8 shadow-2xl border border-[#EAEAEA]"
              initial={{ scale: 0.95, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: -20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#EAEAEA]">
                <h3 className="text-xl font-luxury text-[#000000] font-bold">Search Bobby Studio</h3>
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="w-9 h-9 rounded-full bg-[#FAFAFA] flex items-center justify-center text-[#555555] hover:text-[#000000] transition-colors"
                >
                  <HiX size={20} />
                </button>
              </div>

              <div className="relative mt-6">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#555555]" size={20} />
                <input
                  type="text"
                  placeholder="Search services, packages, blog articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full pl-12 pr-4 py-4 bg-[#FAFAFA] border border-[#EAEAEA] rounded-full text-[#000000] placeholder:text-[#555555]/50 focus:outline-none focus:border-[#000000] transition-colors text-base"
                />
              </div>

              <div className="mt-6">
                <p className="text-xs text-[#555555] uppercase tracking-wider mb-3">Quick Navigation</p>
                <div className="space-y-2">
                  {filteredQuickLinks.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => setIsSearchOpen(false)}
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-[#FAFAFA] transition-colors group"
                    >
                      <span className="text-sm font-medium text-[#000000] group-hover:text-[#000000] transition-colors">{item.name}</span>
                      <span className="text-xs text-[#555555] px-2.5 py-1 bg-[#F3F3F3] rounded-full">{item.category}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-white/98 backdrop-blur-2xl flex flex-col items-center justify-center lg:hidden"
            initial={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at calc(100% - 40px) 40px)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <nav className="flex flex-col items-center gap-4" aria-label="Mobile navigation">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: i * 0.04 + 0.15 }}
                >
                  <Link
                    to={link.path}
                    className={`text-2xl font-luxury tracking-wider transition-colors duration-300 ${
                      location.pathname === link.path ? 'text-[#000000] font-bold' : 'text-[#555555] hover:text-[#000000]'
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-6 flex flex-col items-center gap-4"
              >
                <Link
                  to="/book"
                  className="px-10 py-3.5 bg-[#000000] text-white text-sm font-display font-semibold tracking-widest rounded-full shadow-lg uppercase"
                >
                  BOOK NOW
                </Link>
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-[#000000] font-medium"
                >
                  <FaWhatsapp size={16} /> Chat on WhatsApp
                </a>
              </motion.div>
            </nav>

            <motion.div
              className="absolute bottom-10 flex items-center gap-6 text-[#555555]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <a href="tel:+919876543210" className="hover:text-[#000000] transition-colors" aria-label="Call us">
                <FiPhone size={20} />
              </a>
              <a href="mailto:hello@bobbystudio.com" className="hover:text-[#000000] transition-colors" aria-label="Email us">
                <FiMail size={20} />
              </a>
              <a href="https://instagram.com/bobbystudio" target="_blank" rel="noopener noreferrer" className="hover:text-[#000000] transition-colors" aria-label="Instagram">
                <FiInstagram size={20} />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
