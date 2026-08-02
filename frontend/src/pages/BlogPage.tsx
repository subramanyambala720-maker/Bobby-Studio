import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiCalendar, FiClock, FiUser, FiArrowRight, FiArrowUpRight, FiSearch, FiTag } from 'react-icons/fi';
import FadeIn from '@/components/animations/FadeIn';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';

/* ============================================
   DATA
   ============================================ */

const blogCategories = ['All', 'Wedding Tips', 'Photography', 'Behind the Scenes', 'Style & Fashion', 'Destinations', 'Studio News'];

const blogPosts = [
  {
    id: 1,
    title: 'How to Prepare for Your Wedding Photography Session',
    excerpt: 'The key to stunning wedding photos starts weeks before your big day. From choosing the right time to coordinating with your team, here\'s everything you need to know.',
    category: 'Wedding Tips',
    author: 'Bobby Sharma',
    date: 'January 15, 2026',
    readTime: '7 min read',
    featured: true,
    color: 'from-amber-900/50 to-rose-900/30',
    tags: ['Wedding', 'Tips', 'Preparation'],
  },
  {
    id: 2,
    title: 'The Magic of Golden Hour Photography',
    excerpt: 'That magical 60-minute window after sunrise and before sunset transforms ordinary scenes into extraordinary visual poetry. Learn how we harness this light.',
    category: 'Photography',
    author: 'Priya Kapoor',
    date: 'January 8, 2026',
    readTime: '5 min read',
    featured: false,
    color: 'from-orange-900/50 to-amber-900/30',
    tags: ['Lighting', 'Technique', 'Golden Hour'],
  },
  {
    id: 3,
    title: 'Behind the Lens: Our Udaipur Palace Wedding',
    excerpt: 'An inside look at one of our most spectacular destination weddings — a 3-day royal celebration at the City Palace, Udaipur. 12 photographers, 2 drones, and over 5,000 frames.',
    category: 'Behind the Scenes',
    author: 'Arjun Mehta',
    date: 'December 28, 2025',
    readTime: '10 min read',
    featured: true,
    color: 'from-teal-900/50 to-emerald-900/30',
    tags: ['Destination', 'Wedding', 'BTS'],
  },
  {
    id: 4,
    title: 'Styling Tips for a Perfect Pre-Wedding Shoot',
    excerpt: 'Your pre-wedding shoot is your rehearsal for looking stunning on camera. Our creative director shares her top styling secrets for couples.',
    category: 'Style & Fashion',
    author: 'Priya Kapoor',
    date: 'December 20, 2025',
    readTime: '6 min read',
    featured: false,
    color: 'from-violet-900/50 to-purple-900/30',
    tags: ['Style', 'Pre-Wedding', 'Fashion'],
  },
  {
    id: 5,
    title: 'Top 10 Destination Wedding Locations in India',
    excerpt: 'From Rajasthan\'s opulent palaces to Kerala\'s tranquil backwaters, India offers some of the world\'s most breathtaking backdrops for your dream wedding.',
    category: 'Destinations',
    author: 'Bobby Sharma',
    date: 'December 12, 2025',
    readTime: '8 min read',
    featured: false,
    color: 'from-rose-900/50 to-pink-900/30',
    tags: ['Destination', 'India', 'Travel'],
  },
  {
    id: 6,
    title: 'Understanding Camera Lenses: A Photographer\'s Guide',
    excerpt: 'From the 50mm \'nifty fifty\' to the telephoto 200mm, each lens tells a different story. Here\'s how we choose the right glass for every shot.',
    category: 'Photography',
    author: 'Arjun Mehta',
    date: 'December 5, 2025',
    readTime: '9 min read',
    featured: false,
    color: 'from-blue-900/50 to-indigo-900/30',
    tags: ['Gear', 'Lenses', 'Technical'],
  },
  {
    id: 7,
    title: 'Bobby Studio Wins International Photography Award 2025',
    excerpt: 'We\'re thrilled to announce that Bobby Studio has been awarded the prestigious ISPWP (International Society of Professional Wedding Photographers) Award for 2025.',
    category: 'Studio News',
    author: 'Bobby Sharma',
    date: 'November 28, 2025',
    readTime: '3 min read',
    featured: false,
    color: 'from-yellow-900/50 to-amber-900/30',
    tags: ['Award', 'Achievement', 'News'],
  },
  {
    id: 8,
    title: 'The Art of Candid Photography at Indian Weddings',
    excerpt: 'The most meaningful moments are the ones nobody planned. Our approach to candid wedding photography captures authentic emotions that staged photos simply cannot.',
    category: 'Wedding Tips',
    author: 'Meera Reddy',
    date: 'November 20, 2025',
    readTime: '7 min read',
    featured: false,
    color: 'from-pink-900/50 to-rose-900/30',
    tags: ['Candid', 'Wedding', 'Documentary'],
  },
  {
    id: 9,
    title: 'How Post-Processing Elevates Your Photos from Good to Great',
    excerpt: 'The camera captures the scene, but editing brings the emotion. Our post-production lead reveals the craft behind Bobby Studio\'s signature look.',
    category: 'Photography',
    author: 'Ananya Patel',
    date: 'November 12, 2025',
    readTime: '8 min read',
    featured: false,
    color: 'from-slate-800/50 to-gray-900/30',
    tags: ['Editing', 'Post-Production', 'Color Grade'],
  },
];

/* ============================================
   COMPONENTS
   ============================================ */

const FeaturedPost = ({ post }: { post: typeof blogPosts[0] }) => (
  <FadeIn>
    <Link to={`/blog/${post.id}`} className="group block">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden glass hover:border-primary/20 transition-all duration-500 hover:shadow-gold">
        {/* Image */}
        <div className={`relative aspect-video lg:aspect-auto bg-gradient-to-br ${post.color} min-h-[280px]`}>
          <div className="absolute inset-0 flex items-center justify-center opacity-15">
            <FiCalendar size={80} className="text-white" />
          </div>
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-primary/90 rounded-full text-xs text-background font-bold uppercase tracking-wider">Featured</span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/20 lg:to-background/60" />
        </div>

        {/* Content */}
        <div className="p-8 md:p-10 flex flex-col justify-center">
          <span className="text-xs text-primary tracking-[0.25em] uppercase mb-3">{post.category}</span>
          <h2 className="text-display font-luxury text-text mb-4 group-hover:text-primary transition-colors duration-300 leading-tight">
            {post.title}
          </h2>
          <p className="text-muted text-sm leading-relaxed mb-6">{post.excerpt}</p>
          <div className="flex items-center gap-4 text-xs text-muted mb-6">
            <span className="flex items-center gap-1"><FiUser size={12} /> {post.author}</span>
            <span className="flex items-center gap-1"><FiCalendar size={12} /> {post.date}</span>
            <span className="flex items-center gap-1"><FiClock size={12} /> {post.readTime}</span>
          </div>
          <div className="flex items-center gap-2 text-primary text-sm font-display group-hover:gap-4 transition-all duration-300">
            <span>Read Article</span>
            <FiArrowRight size={16} />
          </div>
        </div>
      </div>
    </Link>
  </FadeIn>
);

const PostCard = ({ post, delay = 0 }: { post: typeof blogPosts[0]; delay?: number }) => (
  <FadeIn delay={delay}>
    <Link to={`/blog/${post.id}`} className="group flex flex-col h-full">
      <div className="glass rounded-2xl overflow-hidden hover:border-primary/20 transition-all duration-500 hover:shadow-gold h-full flex flex-col">
        {/* Image */}
        <div className={`relative aspect-video bg-gradient-to-br ${post.color}`}>
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <FiCalendar size={48} className="text-white" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-card/60 to-transparent" />
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 glass rounded-full text-xs text-primary tracking-wider">{post.category}</span>
          </div>
          <div className="absolute top-3 right-3 w-9 h-9 glass rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <FiArrowUpRight className="text-primary" size={14} />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          <h3 className="text-lg font-luxury text-text mb-3 group-hover:text-primary transition-colors duration-300 leading-snug flex-1">
            {post.title}
          </h3>
          <p className="text-muted text-sm leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span key={tag} className="flex items-center gap-1 text-xs text-muted/70 px-2 py-0.5 border border-glass-border rounded-full">
                <FiTag size={9} /> {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-glass-border text-xs text-muted">
            <span className="flex items-center gap-1"><FiUser size={11} /> {post.author}</span>
            <span className="flex items-center gap-1"><FiClock size={11} /> {post.readTime}</span>
          </div>
        </div>
      </div>
    </Link>
  </FadeIn>
);

/* ============================================
   BLOG PAGE
   ============================================ */

const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const featuredPosts = blogPosts.filter((p) => p.featured);
  const filteredPosts = blogPosts.filter((post) => {
    const matchCat = activeCategory === 'All' || post.category === activeCategory;
    const matchSearch = searchQuery === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch && !post.featured;
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
            <span className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-xs tracking-[0.25em] text-primary uppercase mb-6">
              <FiCalendar size={14} />
              Photography Journal
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-hero font-luxury text-text mb-4">
              Our <span className="text-gradient-gold italic">Blog</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-muted text-clamp-base max-w-2xl mx-auto mb-8">
              Stories, tips, and behind-the-scenes insights from the world of luxury photography.
              Written by passionate artists who live and breathe the craft.
            </p>
          </FadeIn>

          {/* Search */}
          <FadeIn delay={0.3}>
            <div className="relative max-w-lg mx-auto">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-card border border-glass-border rounded-full text-text text-sm placeholder:text-muted/40 focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && activeCategory === 'All' && !searchQuery && (
        <section className="section-padding !pt-0">
          <div className="container-premium">
            <SectionHeading
              label="Featured"
              title="Editor's"
              titleAccent="Picks"
            />
            <div className="space-y-6">
              {featuredPosts.map((post) => (
                <FeaturedPost key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="pb-10">
        <div className="container-premium">
          <FadeIn>
            <div className="flex flex-wrap justify-center gap-2">
              {blogCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
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

      {/* Posts Grid */}
      <section className="section-padding !pt-0">
        <div className="container-premium">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <FiSearch className="text-muted mx-auto mb-4" size={48} />
              <p className="text-muted">No articles found matching your search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post, i) => (
                <PostCard key={post.id} post={post} delay={i * 0.08} />
              ))}
            </div>
          )}

          {filteredPosts.length > 0 && (
            <FadeIn className="text-center mt-12">
              <Button variant="secondary" size="lg" icon={<FiArrowRight />}>
                Load More Articles
              </Button>
            </FadeIn>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section-padding">
        <div className="container-premium">
          <FadeIn>
            <div className="relative p-10 md:p-14 glass rounded-3xl border-glow-gold text-center overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-primary/5 rounded-full blur-[80px]" />
              <div className="relative">
                <p className="text-xs text-primary tracking-[0.25em] uppercase mb-4">Stay Inspired</p>
                <h2 className="text-display font-luxury text-text mb-4">
                  Never Miss a <span className="text-gradient-gold italic">Story</span>
                </h2>
                <p className="text-muted max-w-md mx-auto mb-8 text-sm">
                  Get our latest articles, photography tips, and exclusive behind-the-scenes content delivered to your inbox weekly.
                </p>
                <form className="flex flex-col sm:flex-row max-w-md mx-auto gap-3" onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="flex-1 px-6 py-3.5 bg-background/50 border border-glass-border rounded-full text-text text-sm placeholder:text-muted/50 focus:outline-none focus:border-primary/50 transition-colors"
                    aria-label="Email for newsletter"
                  />
                  <Button variant="primary" size="md" type="submit">Subscribe</Button>
                </form>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </motion.div>
  );
};

export default BlogPage;
