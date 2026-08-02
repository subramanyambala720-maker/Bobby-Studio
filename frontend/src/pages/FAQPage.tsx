import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiSearch, FiChevronDown, FiMessageCircle } from 'react-icons/fi';
import FadeIn from '@/components/animations/FadeIn';
import Button from '@/components/ui/Button';

const faqCategories = ['All', 'Booking', 'Pricing', 'Services', 'Delivery', 'Technical'];

const faqs = [
  { q: 'How do I book a photography session?', a: 'Booking is easy! You can fill out our online booking form, call us at +91 98765 43210, or message us on WhatsApp. We\'ll schedule a consultation to discuss your requirements and lock in your date.', category: 'Booking' },
  { q: 'How far in advance should I book?', a: 'For weddings, we recommend booking 3-6 months in advance to ensure availability. For portraits and commercial shoots, 2-4 weeks is usually sufficient. Peak wedding season (October-February) books up quickly, so early booking is advised.', category: 'Booking' },
  { q: 'What happens after I book?', a: 'After booking, you\'ll receive a confirmation email with a detailed questionnaire. We then schedule a pre-shoot consultation (in-person or video call) to discuss your vision, locations, timeline, and any special requirements.', category: 'Booking' },
  { q: 'What are your payment terms?', a: 'We require a 30% advance to confirm your booking, with 40% due one week before the event and the remaining 30% upon delivery. We accept UPI, bank transfer, credit/debit cards, and cash payments.', category: 'Pricing' },
  { q: 'Can I customize my package?', a: 'Absolutely! All our packages are flexible and can be tailored to your specific needs. We can add extra hours, additional photographers, drone coverage, albums, or any other services. Contact us for a custom quote.', category: 'Pricing' },
  { q: 'Do you offer EMI or installment options?', a: 'Yes, we offer flexible payment plans for packages above ₹50,000. You can choose from 3, 6, or 12-month EMI options through our banking partners. Zero-cost EMI is available on select packages.', category: 'Pricing' },
  { q: 'What areas do you serve?', a: 'We\'re based in Creative City but serve clients nationwide and internationally. For destination shoots and weddings, we travel anywhere in the world. Travel and accommodation costs may apply for locations outside our city.', category: 'Services' },
  { q: 'Do you provide video/cinematography?', a: 'Yes! We offer full cinematic video services including wedding films, highlight reels, drone footage, live streaming, and corporate videos. Our cinematography team uses 4K cameras, drones, gimbals, and professional audio equipment.', category: 'Services' },
  { q: 'Do you offer makeup and styling services?', a: 'While we don\'t directly provide makeup and styling, we have a network of trusted makeup artists, hairstylists, and fashion stylists we regularly collaborate with. We can connect you with them for a seamless experience.', category: 'Services' },
  { q: 'When will I receive my photos?', a: 'Standard delivery timelines: Portraits — 7-10 days, Pre-wedding — 10-15 days, Wedding — 3-4 weeks, Commercial — 5-7 days. Rush delivery is available for an additional fee. A sneak peek of 15-20 photos is shared within 48 hours.', category: 'Delivery' },
  { q: 'How are photos delivered?', a: 'Photos are delivered through our private online gallery where you can view, download, and share. High-resolution images are also provided via Google Drive/Dropbox. Premium packages include USB drives and printed albums.', category: 'Delivery' },
  { q: 'Do I get all the raw/unedited photos?', a: 'We deliver professionally curated and edited photos. Raw/unedited files are not included in standard packages as they don\'t represent our quality standards. However, they can be purchased separately for an additional fee.', category: 'Delivery' },
  { q: 'What equipment do you use?', a: 'We use industry-leading equipment including Canon EOS R5 Mark II, Sony A1, Leica SL3, DJI Inspire 3 drones, Profoto D2 lighting systems, and Hasselblad medium format cameras. We always carry backup equipment.', category: 'Technical' },
  { q: 'What if it rains on my outdoor shoot day?', a: 'Don\'t worry! Rain can actually create stunning, dramatic photos. We carry rain gear for our equipment. If you prefer, we can reschedule outdoor portions to another date at no additional cost, subject to availability.', category: 'Technical' },
  { q: 'What is your cancellation/refund policy?', a: 'Cancellations made 30+ days before: full refund minus processing fee. 15-30 days: 70% refund. 7-14 days: 50% refund. Less than 7 days: no refund. We understand emergencies and handle each case compassionately.', category: 'Booking' },
];

const FAQPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
    const matchesSearch = searchQuery === '' ||
      faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
              Frequently Asked <span className="text-gradient-gold italic">Questions</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-muted text-clamp-base max-w-2xl mx-auto mb-8">
              Everything you need to know about Bobby Studio. Can't find the answer
              you're looking for? Feel free to contact us.
            </p>
          </FadeIn>
          {/* Search */}
          <FadeIn delay={0.2}>
            <div className="relative max-w-lg mx-auto">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-card border border-glass-border rounded-full text-text text-sm placeholder:text-muted/40 focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="pb-8">
        <div className="container-premium">
          <FadeIn>
            <div className="flex flex-wrap justify-center gap-2">
              {faqCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); setOpenIndex(null); }}
                  className={`px-5 py-2 rounded-full text-sm transition-all duration-300 ${
                    activeCategory === cat
                      ? 'bg-primary text-background shadow-gold'
                      : 'glass text-muted hover:text-text'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="section-padding !pt-8">
        <div className="container-premium max-w-3xl">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted">No questions found matching your search.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredFaqs.map((faq, i) => (
                <FadeIn key={i} delay={i * 0.05}>
                  <div className="glass rounded-2xl overflow-hidden hover:border-primary/15 transition-all duration-300">
                    <button
                      className="w-full text-left px-6 py-5 flex items-start justify-between gap-4"
                      onClick={() => setOpenIndex(openIndex === i ? null : i)}
                      aria-expanded={openIndex === i}
                    >
                      <div className="flex-1">
                        <span className="text-xs text-primary/60 uppercase tracking-wider">{faq.category}</span>
                        <h3 className={`text-sm md:text-base font-medium mt-1 transition-colors ${
                          openIndex === i ? 'text-primary' : 'text-text'
                        }`}>
                          {faq.q}
                        </h3>
                      </div>
                      <motion.div
                        animate={{ rotate: openIndex === i ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-shrink-0 mt-2"
                      >
                        <FiChevronDown className={`transition-colors ${
                          openIndex === i ? 'text-primary' : 'text-muted'
                        }`} size={18} />
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {openIndex === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-5 pt-0">
                            <div className="border-t border-glass-border pt-4">
                              <p className="text-muted text-sm leading-relaxed">{faq.a}</p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section className="section-padding">
        <div className="container-premium text-center">
          <FadeIn>
            <div className="glass rounded-3xl p-10 md:p-14 border-glow-gold">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <FiMessageCircle className="text-primary" size={28} />
              </div>
              <h2 className="text-title font-luxury text-text mb-3">
                Still Have <span className="text-gradient-gold italic">Questions?</span>
              </h2>
              <p className="text-muted max-w-md mx-auto mb-8">
                We're here to help. Reach out to us and our team will get back
                to you within 24 hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/contact">
                  <Button variant="primary" size="lg">Contact Us</Button>
                </Link>
                <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
                  <Button variant="glass" size="lg">Chat on WhatsApp</Button>
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </motion.div>
  );
};

export default FAQPage;
