import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPhone, FiMail, FiMapPin, FiClock, FiSend, FiInstagram, FiYoutube, FiMessageSquare } from 'react-icons/fi';
import { FaWhatsapp, FaFacebookF } from 'react-icons/fa';
import FadeIn from '@/components/animations/FadeIn';
import Button from '@/components/ui/Button';

const contactInfo = [
  { icon: FiPhone, label: 'Phone', value: '+91 98765 43210', href: 'tel:+919876543210', sub: 'Mon-Sat, 9am-8pm' },
  { icon: FiMail, label: 'Email', value: 'hello@bobbystudio.com', href: 'mailto:hello@bobbystudio.com', sub: 'We reply within 24 hours' },
  { icon: FiMapPin, label: 'Studio', value: '42 Premium Avenue, Photography District', href: '#map', sub: 'Creative City — 400001' },
  { icon: FiClock, label: 'Working Hours', value: 'Mon - Sat: 9:00 AM - 8:00 PM', href: undefined, sub: 'Sunday by appointment only' },
];

const socialLinks = [
  { icon: FiInstagram, label: 'Instagram', href: 'https://instagram.com/bobbystudio', handle: '@bobbystudio' },
  { icon: FaWhatsapp, label: 'WhatsApp', href: 'https://wa.me/919876543210', handle: '+91 98765 43210' },
  { icon: FiYoutube, label: 'YouTube', href: 'https://youtube.com/bobbystudio', handle: 'Bobby Studio' },
  { icon: FaFacebookF, label: 'Facebook', href: 'https://facebook.com/bobbystudio', handle: 'Bobby Studio' },
];

const serviceOptions = [
  'Wedding Photography',
  'Pre-Wedding Shoot',
  'Portrait Session',
  'Fashion Photography',
  'Cinematography',
  'Product Photography',
  'Food Photography',
  'Corporate Event',
  'Baby / Newborn',
  'Destination Shoot',
  'Other',
];

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', service: '', date: '', message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
  };

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
              Get In <span className="text-gradient-gold italic">Touch</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-muted text-clamp-base max-w-2xl mx-auto">
              Ready to create something extraordinary? Let's discuss your vision and
              turn your moments into timeless masterpieces.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="pb-12">
        <div className="container-premium">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactInfo.map((info, i) => (
              <FadeIn key={info.label} delay={i * 0.1}>
                <a
                  href={info.href}
                  className="group block p-6 glass rounded-2xl hover:border-primary/20 transition-all duration-500 hover:shadow-gold text-center h-full"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <info.icon className="text-primary" size={20} />
                  </div>
                  <p className="text-xs text-primary tracking-[0.2em] uppercase mb-1">{info.label}</p>
                  <p className="text-text text-sm font-medium mb-1">{info.value}</p>
                  <p className="text-muted text-xs">{info.sub}</p>
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Map */}
      <section className="section-padding !pt-8">
        <div className="container-premium">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Form */}
            <div className="lg:col-span-3">
              <FadeIn>
                <div className="glass rounded-2xl p-8 md:p-10">
                  <h2 className="text-title font-luxury text-text mb-2">
                    Send Us a <span className="text-gradient-gold italic">Message</span>
                  </h2>
                  <p className="text-muted text-sm mb-8">Fill in the details below and we'll get back to you within 24 hours.</p>

                  {submitted ? (
                    <motion.div
                      className="text-center py-12"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4">
                        <FiSend className="text-success" size={24} />
                      </div>
                      <h3 className="text-xl font-luxury text-text mb-2">Message Sent!</h3>
                      <p className="text-muted text-sm">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                      <button
                        className="mt-6 text-primary text-sm underline"
                        onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', phone: '', service: '', date: '', message: '' }); }}
                      >
                        Send another message
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs text-muted uppercase tracking-wider mb-2" htmlFor="name">Full Name *</label>
                          <input
                            id="name" name="name" type="text" required value={formData.name} onChange={handleChange}
                            className="w-full px-4 py-3 bg-white border border-glass-border rounded-xl text-text text-sm placeholder:text-muted/40 focus:outline-none focus:border-primary/50 transition-colors"
                            placeholder="Your name"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-muted uppercase tracking-wider mb-2" htmlFor="email">Email *</label>
                          <input
                            id="email" name="email" type="email" required value={formData.email} onChange={handleChange}
                            className="w-full px-4 py-3 bg-white border border-glass-border rounded-xl text-text text-sm placeholder:text-muted/40 focus:outline-none focus:border-primary/50 transition-colors"
                            placeholder="your@email.com"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs text-muted uppercase tracking-wider mb-2" htmlFor="phone">Phone</label>
                          <input
                            id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange}
                            className="w-full px-4 py-3 bg-white border border-glass-border rounded-xl text-text text-sm placeholder:text-muted/40 focus:outline-none focus:border-primary/50 transition-colors"
                            placeholder="+91 98765 43210"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-muted uppercase tracking-wider mb-2" htmlFor="service">Service</label>
                          <select
                            id="service" name="service" value={formData.service} onChange={handleChange}
                            className="w-full px-4 py-3 bg-white border border-glass-border rounded-xl text-text text-sm focus:outline-none focus:border-primary/50 transition-colors appearance-none"
                          >
                            <option value="" className="bg-card">Select a service</option>
                            {serviceOptions.map((s) => (
                              <option key={s} value={s} className="bg-card">{s}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs text-muted uppercase tracking-wider mb-2" htmlFor="date">Preferred Date</label>
                        <input
                          id="date" name="date" type="date" value={formData.date} onChange={handleChange}
                          className="w-full px-4 py-3 bg-white border border-glass-border rounded-xl text-text text-sm focus:outline-none focus:border-primary/50 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-muted uppercase tracking-wider mb-2" htmlFor="message">Message *</label>
                        <textarea
                          id="message" name="message" required rows={5} value={formData.message} onChange={handleChange}
                          className="w-full px-4 py-3 bg-white border border-glass-border rounded-xl text-text text-sm placeholder:text-muted/40 focus:outline-none focus:border-primary/50 transition-colors resize-none"
                          placeholder="Tell us about your project, event, or any special requirements..."
                        />
                      </div>
                      <Button type="submit" variant="primary" size="lg" fullWidth disabled={isSubmitting} icon={<FiSend />}>
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </Button>
                    </form>
                  )}
                </div>
              </FadeIn>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              {/* Map placeholder */}
              <FadeIn delay={0.2}>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-card border border-glass-border">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-card flex items-center justify-center">
                    <div className="text-center">
                      <FiMapPin className="text-primary mx-auto mb-2" size={32} />
                      <p className="text-text text-sm font-luxury">Bobby Studio</p>
                      <p className="text-muted text-xs mt-1">42 Premium Avenue, Creative City</p>
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* WhatsApp CTA */}
              <FadeIn delay={0.3}>
                <a
                  href="https://wa.me/919876543210?text=Hi%20Bobby%20Studio!%20I'm%20interested%20in%20your%20photography%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-5 glass rounded-2xl hover:border-green-500/30 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                    <FaWhatsapp className="text-green-400" size={22} />
                  </div>
                  <div>
                    <p className="text-text text-sm font-medium">Chat on WhatsApp</p>
                    <p className="text-muted text-xs">Quick response • Usually within 30 minutes</p>
                  </div>
                </a>
              </FadeIn>

              {/* Social Links */}
              <FadeIn delay={0.4}>
                <div className="glass rounded-2xl p-6">
                  <h3 className="text-sm font-display text-text uppercase tracking-wider mb-4">Follow Us</h3>
                  <div className="space-y-3">
                    {socialLinks.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-muted hover:text-primary transition-colors group"
                      >
                        <div className="w-9 h-9 rounded-full border border-glass-border flex items-center justify-center group-hover:border-primary/40 transition-colors">
                          <s.icon size={14} />
                        </div>
                        <div>
                          <p className="text-sm">{s.label}</p>
                          <p className="text-xs text-muted/60">{s.handle}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default ContactPage;
