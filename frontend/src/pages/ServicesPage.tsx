import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowUpRight, FiCheck, FiCamera, FiHeart, FiStar, FiFilm, FiImage, FiMapPin, FiDroplet, FiGrid, FiHome, FiBox, FiUsers, FiGift, FiMonitor, FiZap } from 'react-icons/fi';
import FadeIn from '@/components/animations/FadeIn';
import FloatingCard from '@/components/animations/FloatingCard';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';

const allServices = [
  { title: 'Wedding Photography', desc: 'Timeless moments captured with cinematic elegance and unparalleled artistry.', icon: FiHeart, price: '₹49,999', highlights: ['Full Day Coverage', 'Two Photographers', 'Cinematic Edits', 'Premium Album', '500+ Photos', 'Drone Coverage'], color: 'from-amber-900/30 to-rose-900/20', featured: true },
  { title: 'Pre-Wedding Shoots', desc: 'Romantic stories told through artistic vision at breathtaking locations.', icon: FiCamera, price: '₹24,999', highlights: ['4-Hour Session', 'Location Scouting', 'Outfit Guidance', '100+ Photos', 'Creative Concepts', 'Video Teaser'], color: 'from-rose-900/30 to-pink-900/20', featured: true },
  { title: 'Engagement', desc: 'Celebrate your "yes" moment with stunning engagement photography.', icon: FiGift, price: '₹19,999', highlights: ['3-Hour Session', 'Ring Ceremony Coverage', 'Family Portraits', '80+ Photos', 'Same-Day Edits'], color: 'from-pink-900/30 to-fuchsia-900/20', featured: false },
  { title: 'Food Photography', desc: 'Mouthwatering food imagery that makes every dish irresistible.', icon: FiDroplet, price: '₹12,999', highlights: ['Prop Styling', 'Menu Shoots', 'Social Media Ready', 'Action Shots', 'Flat Lays'], color: 'from-orange-900/30 to-red-900/20', featured: false },
  { title: 'Portrait Photography', desc: 'Professional portraits that reveal your authentic self with artistry.', icon: FiUsers, price: '₹14,999', highlights: ['2-Hour Session', 'Studio or Outdoor', 'Multiple Outfits', '50+ Photos', 'Professional Retouching'], color: 'from-stone-800/30 to-neutral-900/20', featured: true },
  { title: 'Baby & Newborn', desc: 'Precious newborn portraits capturing fleeting moments with care.', icon: FiHeart, price: '₹9,999', highlights: ['Safe Environment', 'Props & Wraps', 'Parent Shots', '30+ Photos', 'Digital Gallery'], color: 'from-pink-800/30 to-rose-900/20', featured: false },
  { title: 'Architecture & Interior', desc: 'Showcase spaces with dramatic angles and perfect lighting.', icon: FiHome, price: '₹24,999', highlights: ['Wide Angle', 'HDR Blending', 'Drone Aerials', 'Virtual Tours', 'Magazine Ready'], color: 'from-emerald-900/30 to-teal-900/20', featured: false },
  { title: 'Destination Shoots', desc: 'Breathtaking shoots at iconic destinations around the world.', icon: FiMapPin, price: '₹99,999', highlights: ['Travel Included', 'Location Scouting', 'Multi-Day Coverage', 'Drone Footage', 'Custom Itinerary'], color: 'from-teal-900/30 to-cyan-900/20', featured: true },
  { title: 'Jewellery Photography', desc: 'Capture the brilliance and detail of fine jewellery pieces.', icon: FiGrid, price: '₹14,999', highlights: ['Macro Photography', 'Reflection Control', 'Color Accuracy', '360° Spins', 'Catalog Ready'], color: 'from-yellow-900/30 to-amber-900/20', featured: false },
];

const ServicesPage = () => {
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
              Our <span className="text-gradient-gold italic">Services</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-muted text-clamp-base max-w-2xl mx-auto">
              From intimate portraits to grand celebrations, we offer a complete suite
              of luxury photography and cinematography services tailored to perfection.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding !pt-0">
        <div className="container-premium">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allServices.map((service, i) => (
              <FadeIn key={service.title} delay={i * 0.06}>
                <FloatingCard intensity={4}>
                  <div className="group h-full glass rounded-2xl overflow-hidden hover:border-primary/25 transition-all duration-500 hover:shadow-gold">
                    {/* Hero gradient */}
                    <div className={`relative h-36 bg-gradient-to-br ${service.color}`}>
                      <div className="absolute inset-0 flex items-center justify-center opacity-20">
                        <service.icon size={48} className="text-primary" />
                      </div>
                      {service.featured && (
                        <div className="absolute top-3 right-3 px-3 py-1 bg-primary/90 rounded-full text-[10px] text-background font-bold uppercase tracking-wider">
                          Popular
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-card to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="p-6 -mt-4 relative">
                      <div className="w-11 h-11 rounded-xl bg-primary/15 flex items-center justify-center mb-4 group-hover:bg-primary/25 transition-colors">
                        <service.icon className="text-primary" size={20} />
                      </div>
                      <h3 className="text-lg font-luxury text-text mb-2 group-hover:text-primary transition-colors">{service.title}</h3>
                      <p className="text-muted text-sm leading-relaxed mb-4">{service.desc}</p>

                      {/* Highlights */}
                      <div className="space-y-1.5 mb-5">
                        {service.highlights.slice(0, 4).map((h) => (
                          <div key={h} className="flex items-center gap-2 text-xs text-muted">
                            <FiCheck className="text-primary flex-shrink-0" size={12} />
                            <span>{h}</span>
                          </div>
                        ))}
                        {service.highlights.length > 4 && (
                          <p className="text-xs text-primary/60">+{service.highlights.length - 4} more</p>
                        )}
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-4 border-t border-glass-border">
                        <div>
                          <p className="text-[10px] text-muted uppercase tracking-wider">Starting from</p>
                          <p className="text-primary font-display font-bold text-lg">{service.price}</p>
                        </div>
                        <Link to="/book" className="w-10 h-10 rounded-full border border-glass-border flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/10 transition-all duration-300">
                          <FiArrowUpRight className="text-muted group-hover:text-primary transition-colors" size={16} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </FloatingCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-card/30">
        <div className="container-premium text-center">
          <FadeIn>
            <h2 className="text-display font-luxury text-text mb-4">
              Can't Find What You <span className="text-gradient-gold italic">Need?</span>
            </h2>
            <p className="text-muted max-w-lg mx-auto mb-8">
              We offer custom photography packages tailored to your unique requirements.
              Let's discuss your vision.
            </p>
            <Link to="/contact">
              <Button variant="primary" size="lg">Contact Us</Button>
            </Link>
          </FadeIn>
        </div>
      </section>
    </motion.div>
  );
};

export default ServicesPage;
