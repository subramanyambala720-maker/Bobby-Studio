import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiHeart, FiStar, FiFilter, FiSearch, FiArrowRight, FiCheck, FiPackage } from 'react-icons/fi';
import FadeIn from '@/components/animations/FadeIn';
import SectionHeading from '@/components/ui/SectionHeading';
import FloatingCard from '@/components/animations/FloatingCard';
import Button from '@/components/ui/Button';

/* ============================================
   DATA
   ============================================ */

const shopCategories = ['All', 'Photo Albums', 'Prints', 'Frames', 'Digital Products', 'Gift Cards', 'Merchandise'];

const shopItems = [
  {
    id: 1,
    name: 'Luxury Italian Wedding Album',
    category: 'Photo Albums',
    price: 12999,
    originalPrice: 16999,
    rating: 4.9,
    reviews: 128,
    description: 'Hand-crafted Italian leather album with lay-flat pages and gold embossing. 40 pages, 20x20cm.',
    features: ['Genuine Italian Leather', 'Lay-flat Pages', 'Gold Embossing', '40 Pages', 'Gift Box Included'],
    badge: 'Best Seller',
    color: 'from-amber-900/40 to-rose-900/20',
  },
  {
    id: 2,
    name: 'Fine Art Canvas Print',
    category: 'Prints',
    price: 3999,
    rating: 4.8,
    reviews: 89,
    description: 'Museum-quality giclée canvas print with archival inks. Available in multiple sizes from 12x16" to 30x40".',
    features: ['Museum-Grade Canvas', 'Archival Inks', 'Gallery Wrap', '50+ Year Longevity', 'Free Shipping'],
    badge: null,
    color: 'from-violet-900/40 to-indigo-900/20',
  },
  {
    id: 3,
    name: 'Digital Gallery Access — 1 Year',
    category: 'Digital Products',
    price: 2499,
    rating: 4.7,
    reviews: 45,
    description: 'Unlimited access to your private online gallery with full-resolution downloads for one year.',
    features: ['Full Resolution Downloads', 'Private Gallery Link', 'Share with Family', 'Mobile App Access', '1 Year Access'],
    badge: 'New',
    color: 'from-teal-900/40 to-cyan-900/20',
  },
  {
    id: 4,
    name: 'Premium Silver Gelatin Print',
    category: 'Prints',
    price: 5999,
    rating: 4.9,
    reviews: 62,
    description: 'Traditional darkroom silver gelatin print for collectors and art enthusiasts. Signed and numbered.',
    features: ['Darkroom Process', 'Signed & Numbered', 'Certificate of Authenticity', 'Limited Edition', 'Archival Quality'],
    badge: 'Limited',
    color: 'from-stone-800/40 to-neutral-900/20',
  },
  {
    id: 5,
    name: 'Handcrafted Wooden Frame',
    category: 'Frames',
    price: 4499,
    originalPrice: 5999,
    rating: 4.6,
    reviews: 34,
    description: 'Premium solid teak wood frame with UV-protective glass. Designed to complement any interior.',
    features: ['Solid Teak Wood', 'UV-Protective Glass', 'Multiple Finishes', 'Custom Sizes', 'Wall Mount Included'],
    badge: 'Sale',
    color: 'from-orange-900/40 to-amber-900/20',
  },
  {
    id: 6,
    name: 'Bobby Studio Gift Card',
    category: 'Gift Cards',
    price: 5000,
    rating: 5.0,
    reviews: 211,
    description: 'Give the gift of luxury photography. Valid for any service or product. Available in multiple denominations.',
    features: ['Any Denomination', 'Never Expires', 'Digital Delivery', 'Custom Message', 'Redeemable Online/In-Store'],
    badge: 'Perfect Gift',
    color: 'from-rose-900/40 to-pink-900/20',
  },
  {
    id: 7,
    name: 'Mini Accordion Photo Book',
    category: 'Photo Albums',
    price: 1999,
    rating: 4.7,
    reviews: 156,
    description: 'Elegant accordion-style mini book. Perfect for displaying your 12 favorite moments in a unique format.',
    features: ['12 Photos', 'Accordion Style', 'Linen Cover', 'Compact Design', 'Gift Ready'],
    badge: null,
    color: 'from-pink-900/40 to-fuchsia-900/20',
  },
  {
    id: 8,
    name: 'Photography Lightroom Presets Pack',
    category: 'Digital Products',
    price: 1499,
    rating: 4.5,
    reviews: 389,
    description: 'The Bobby Studio signature editing presets — 50 professional Lightroom presets for stunning results.',
    features: ['50 Presets', 'Lightroom & ACR', 'Mobile Compatible', 'Video Tutorial', 'Lifetime Access'],
    badge: 'Digital',
    color: 'from-blue-900/40 to-indigo-900/20',
  },
  {
    id: 9,
    name: 'Bobby Studio Branded Tote',
    category: 'Merchandise',
    price: 899,
    rating: 4.4,
    reviews: 78,
    description: 'Premium canvas tote bag with the iconic Bobby Studio monogram. Perfect for the photography enthusiast.',
    features: ['Heavy Canvas', 'Gold Embroidery', 'Inner Pockets', 'Zip Closure', 'Eco-friendly'],
    badge: null,
    color: 'from-emerald-900/40 to-teal-900/20',
  },
];

/* ============================================
   SHOP PAGE
   ============================================ */

const ShopPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [wishlist, setWishlist] = useState<number[]>([]);

  const filteredItems = shopItems.filter((item) => {
    const matchCat = activeCategory === 'All' || item.category === activeCategory;
    const matchSearch = searchQuery === '' ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const toggleWishlist = (id: number) => {
    setWishlist((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  };

  const formatPrice = (price: number) => `₹${price.toLocaleString('en-IN')}`;

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
            <span className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-xs tracking-[0.25em] text-primary uppercase mb-6">
              <FiPackage size={14} />
              Premium Photography Products
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-hero font-luxury text-text mb-4">
              Our <span className="text-gradient-gold italic">Shop</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-muted text-clamp-base max-w-2xl mx-auto mb-8">
              Curated photography products, luxury albums, and exclusive digital resources
              crafted to preserve and display your memories in the most exquisite way.
            </p>
          </FadeIn>

          {/* Cart indicator */}
          {cartCount > 0 && (
            <FadeIn delay={0.3}>
              <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-sm text-primary">
                <FiShoppingCart size={16} />
                <span>{cartCount} item{cartCount > 1 ? 's' : ''} in cart</span>
              </div>
            </FadeIn>
          )}
        </div>
      </section>

      {/* Search + Filter Bar */}
      <section className="pb-8">
        <div className="container-premium">
          <FadeIn>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-card border border-glass-border rounded-full text-text text-sm placeholder:text-muted/40 focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {shopCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
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

      {/* Products Grid */}
      <section className="section-padding !pt-0">
        <div className="container-premium">
          {filteredItems.length === 0 ? (
            <div className="text-center py-20">
              <FiSearch className="text-muted mx-auto mb-4" size={48} />
              <p className="text-muted">No products found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item, i) => (
                <FadeIn key={item.id} delay={i * 0.08}>
                  <FloatingCard intensity={4}>
                    <div className="group glass rounded-2xl overflow-hidden hover:border-primary/20 transition-all duration-500 hover:shadow-gold h-full flex flex-col">
                      {/* Image */}
                      <div className={`relative aspect-video bg-gradient-to-br ${item.color}`}>
                        <div className="absolute inset-0 flex items-center justify-center opacity-10">
                          <FiPackage size={56} className="text-white" />
                        </div>
                        {item.badge && (
                          <div className="absolute top-3 left-3">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                              item.badge === 'Sale' ? 'bg-red-500/90 text-white' :
                              item.badge === 'Best Seller' ? 'bg-primary/90 text-background' :
                              item.badge === 'Limited' ? 'bg-amber-600/90 text-white' :
                              item.badge === 'New' ? 'bg-emerald-600/90 text-white' :
                              item.badge === 'Perfect Gift' ? 'bg-rose-500/90 text-white' :
                              'glass text-primary'
                            }`}>
                              {item.badge}
                            </span>
                          </div>
                        )}
                        {/* Wishlist */}
                        <button
                          className="absolute top-3 right-3 w-9 h-9 glass rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                          onClick={() => toggleWishlist(item.id)}
                          aria-label={wishlist.includes(item.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                        >
                          <FiHeart
                            size={16}
                            className={wishlist.includes(item.id) ? 'text-red-400 fill-red-400' : 'text-white'}
                          />
                        </button>
                      </div>

                      {/* Content */}
                      <div className="p-6 flex flex-col flex-1">
                        <p className="text-xs text-primary tracking-wider uppercase mb-1">{item.category}</p>
                        <h3 className="text-lg font-luxury text-text mb-2 group-hover:text-primary transition-colors">
                          {item.name}
                        </h3>
                        <p className="text-muted text-sm leading-relaxed mb-4 line-clamp-2">{item.description}</p>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-4">
                          <div className="flex gap-0.5">
                            {Array.from({ length: 5 }).map((_, j) => (
                              <FiStar
                                key={j}
                                size={12}
                                className={j < Math.floor(item.rating) ? 'text-primary fill-primary' : 'text-muted/30'}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-muted">{item.rating} ({item.reviews} reviews)</span>
                        </div>

                        {/* Features */}
                        <div className="space-y-1.5 mb-5">
                          {item.features.slice(0, 3).map((f) => (
                            <div key={f} className="flex items-center gap-2 text-xs text-muted">
                              <FiCheck className="text-primary flex-shrink-0" size={11} />
                              <span>{f}</span>
                            </div>
                          ))}
                        </div>

                        {/* Price + CTA */}
                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-glass-border">
                          <div>
                            <p className="text-xl font-display font-bold text-text">{formatPrice(item.price)}</p>
                            {item.originalPrice && (
                              <p className="text-xs text-muted line-through">{formatPrice(item.originalPrice)}</p>
                            )}
                          </div>
                          <button
                            className="flex items-center gap-2 px-4 py-2.5 bg-primary text-background text-xs font-display font-semibold rounded-full hover:bg-hover transition-all duration-300 hover:shadow-gold"
                            onClick={() => setCartCount((c) => c + 1)}
                          >
                            <FiShoppingCart size={13} />
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </FloatingCard>
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16 bg-card/30">
        <div className="container-premium">
          <FadeIn>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { icon: '🚚', title: 'Free Shipping', sub: 'On orders above ₹5,000' },
                { icon: '🔒', title: 'Secure Payment', sub: 'SSL encrypted checkout' },
                { icon: '↩️', title: 'Easy Returns', sub: '30-day hassle-free returns' },
                { icon: '🎁', title: 'Gift Wrapping', sub: 'Premium packaging available' },
              ].map((b) => (
                <div key={b.title} className="glass rounded-2xl p-6 hover:border-primary/20 transition-all duration-300">
                  <div className="text-3xl mb-3">{b.icon}</div>
                  <h3 className="text-sm font-display text-text font-semibold mb-1">{b.title}</h3>
                  <p className="text-xs text-muted">{b.sub}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Custom Order CTA */}
      <section className="section-padding">
        <div className="container-premium text-center">
          <FadeIn>
            <div className="glass rounded-3xl p-10 md:p-14 border-glow-gold">
              <h2 className="text-display font-luxury text-text mb-4">
                Need a <span className="text-gradient-gold italic">Custom Order?</span>
              </h2>
              <p className="text-muted max-w-lg mx-auto mb-8">
                Looking for something not in our standard catalog? We create bespoke albums,
                prints, and products tailored to your exact specifications.
              </p>
              <Link to="/contact">
                <Button variant="primary" size="lg" icon={<FiArrowRight />}>Contact for Custom Order</Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </motion.div>
  );
};

export default ShopPage;
