import { Link } from 'react-router-dom';
import { FiPhone, FiMail, FiMapPin, FiInstagram, FiYoutube, FiArrowUpRight } from 'react-icons/fi';
import { FaFacebookF, FaPinterestP, FaWhatsapp } from 'react-icons/fa';

const footerLinks = {
  quickLinks: [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Packages', path: '/packages' },
    { name: 'Contact', path: '/contact' },
  ],
  services: [
    { name: 'Wedding Photography', path: '/services' },
    { name: 'Pre Wedding Shoots', path: '/services' },
    { name: 'Engagement', path: '/services' },
    { name: 'Maternity Shoots', path: '/services' },
    { name: 'Baby Shoot & Birthdays', path: '/services' },
    { name: 'Fashion & Portraits', path: '/services' },
    { name: 'Drone & Cinematography', path: '/services' },
    { name: 'Live Streaming', path: '/services' },
  ],
  socials: [
    { name: 'Instagram', href: 'https://instagram.com/bobbystudio', icon: FiInstagram },
    { name: 'Facebook', href: 'https://facebook.com/bobbystudio', icon: FaFacebookF },
    { name: 'YouTube', href: 'https://youtube.com/bobbystudio', icon: FiYoutube },
    { name: 'Pinterest', href: 'https://pinterest.com/bobbystudio', icon: FaPinterestP },
    { name: 'WhatsApp', href: 'https://wa.me/919876543210', icon: FaWhatsapp },
  ],
};

const Footer = () => {
  return (
    <footer className="relative bg-[#000000] text-[#FFFFFF] border-t border-white/10 pt-20 pb-12">
      <div className="container-premium">
        {/* Top CTA Banner */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pb-16 border-b border-white/10">
          <div className="max-w-2xl">
            <p className="text-xs text-[#A0A0A0] tracking-[0.25em] uppercase font-display mb-3">
              Crafting Timeless Visual Masterpieces
            </p>
            <h2 className="text-display font-luxury text-[#FFFFFF] leading-tight">
              Let&apos;s Create Something{' '}
              <span className="italic font-bold text-white">Beautiful Together</span>
            </h2>
          </div>
          <Link
            to="/book"
            className="group flex items-center gap-3 px-8 py-4 bg-white text-[#000000] text-xs font-display font-semibold tracking-[0.2em] rounded-full transition-all duration-500 hover:scale-105 uppercase"
          >
            <span>Book Your Session</span>
            <FiArrowUpRight className="text-lg group-hover:rotate-45 transition-transform duration-300" />
          </Link>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3.5 group">
              <div className="w-10 h-10 border border-white rounded-full flex items-center justify-center">
                <span className="text-lg font-luxury text-[#FFFFFF] font-bold">B</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-luxury tracking-[0.2em] text-[#FFFFFF] font-semibold leading-none">
                  BOBBY STUDIO
                </span>
                <span className="text-[9px] tracking-[0.35em] uppercase text-[#A0A0A0] leading-none mt-1">
                  Luxury Photography
                </span>
              </div>
            </Link>
            <p className="text-[#A0A0A0] text-sm leading-relaxed font-light max-w-sm">
              We create unforgettable wedding stories, cinematic films, elegant portraits, and timeless memories through world-class photography and filmmaking.
            </p>
            <div className="space-y-3 pt-2">
              <a href="tel:+919876543210" className="flex items-center gap-3 text-[#A0A0A0] hover:text-white transition-colors text-sm">
                <FiPhone size={16} className="text-white" />
                <span>+91 98765 43210</span>
              </a>
              <a href="mailto:hello@bobbystudio.com" className="flex items-center gap-3 text-[#A0A0A0] hover:text-white transition-colors text-sm">
                <FiMail size={16} className="text-white" />
                <span>hello@bobbystudio.com</span>
              </a>
              <div className="flex items-start gap-3 text-[#A0A0A0] text-sm">
                <FiMapPin size={16} className="text-white mt-0.5 flex-shrink-0" />
                <span>42 Premium Avenue, Creative District, India — 400001</span>
              </div>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-base font-luxury tracking-widest text-[#FFFFFF] font-semibold uppercase mb-6 border-l-2 border-white pl-3">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-[#A0A0A0] hover:text-white transition-colors text-sm font-light tracking-wide flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white/30 group-hover:bg-white transition-colors" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="text-base font-luxury tracking-widest text-[#FFFFFF] font-semibold uppercase mb-6 border-l-2 border-white pl-3">
              Our Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-[#A0A0A0] hover:text-white transition-colors text-sm font-light tracking-wide flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white/30 group-hover:bg-white transition-colors" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Newsletter Column */}
          <div className="space-y-6">
            <h4 className="text-base font-luxury tracking-widest text-[#FFFFFF] font-semibold uppercase mb-6 border-l-2 border-white pl-3">
              Follow Bobby Studio
            </h4>
            <div className="flex flex-wrap gap-3">
              {footerLinks.socials.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                  className="w-11 h-11 rounded-full border border-white/20 bg-transparent flex items-center justify-center text-white hover:bg-white hover:text-black hover:scale-110 transition-all duration-300"
                >
                  <item.icon size={18} />
                </a>
              ))}
            </div>

            <div className="pt-4">
              <p className="text-xs text-[#A0A0A0] uppercase tracking-wider mb-3">Newsletter</p>
              <div className="flex items-center gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-[#111111] border border-white/20 rounded-full text-xs text-white placeholder:text-[#A0A0A0]/60 focus:outline-none focus:border-white transition-colors"
                />
                <button
                  aria-label="Subscribe to newsletter"
                  className="px-5 py-3 bg-white text-black hover:bg-white/90 text-xs font-semibold rounded-full transition-colors flex-shrink-0"
                >
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#A0A0A0] gap-4">
          <p>© 2026 Bobby Studio. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
