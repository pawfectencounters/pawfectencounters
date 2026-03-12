import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Camera, Heart, ShoppingBag, Youtube, Calendar, Sparkles } from 'lucide-react';
import { products, pets, youtubeVideos } from '@/data';
import { useScrollAnimation, useStaggerAnimation } from '@/hooks/useScrollAnimation';

export function HomePage() {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: featuresRef, isVisible: featuresVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: productsRef, isVisible: productsVisible } = useScrollAnimation<HTMLDivElement>();
  const { containerRef: youtubeRef, isVisible: youtubeVisible } = useStaggerAnimation<HTMLDivElement>(4);
  const { ref: adoptionRef, isVisible: adoptionVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <img
            src="/hero-main.jpg"
            alt="Pet Photography"
            className="w-full h-full object-cover scale-105 animate-float-slow"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/60 to-transparent" />
          {/* Subtle Grid Overlay */}
          <div className="absolute inset-0 bg-grid opacity-30" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10" ref={heroRef}>
          <div className={`max-w-2xl space-y-6 transition-all duration-1000 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Badge className="text-sm px-4 py-1.5 bg-primary/20 text-primary border-primary/30 backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 mr-1" />
              Street Pet Photography
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Capturing{' '}
              <span className="text-gradient-animated">Pawfect</span>{' '}
              Moments
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Every pet has a story. We capture the unique personalities of our furry friends
              through street photography, creating memories that last a lifetime.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link to="/photoshoot">
                <Button size="lg" variant="glow" className="gap-2 text-base">
                  <Camera className="h-5 w-5" />
                  Book a Photoshoot
                </Button>
              </Link>
              <Link to="/shop">
                <Button size="lg" variant="gradient-border" className="gap-2 text-base">
                  <ShoppingBag className="h-5 w-5" />
                  Shop Merch
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Floating Decorative Elements */}
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-40 w-24 h-24 bg-primary/5 rounded-full blur-2xl animate-float" />
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4" ref={featuresRef}>
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-1000 ${featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {[
            { icon: Camera, title: 'Pet Photography', desc: 'Professional street-style pet photography sessions that capture your pet\'s unique personality.', link: '/photoshoot', linkText: 'Learn More' },
            { icon: Heart, title: 'Pet Adoption', desc: 'Help rescue pets find their forever homes. Browse available pets and start the adoption process.', link: '/adoption', linkText: 'Meet Our Pets' },
            { icon: ShoppingBag, title: 'Pet Merchandise', desc: 'Shop our collection of pet-themed apparel, accessories, and home goods.', link: '/shop', linkText: 'Shop Now' },
          ].map((feature, index) => (
            <Card 
              key={feature.title} 
              className="group card-glow card-lift glass-card overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 space-y-4">
                <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.desc}
                </p>
                <Link to={feature.link} className="inline-flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                  {feature.linkText} <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4" ref={productsRef}>
        <div className={`flex items-center justify-between mb-8 transition-all duration-1000 ${productsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div>
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <p className="text-muted-foreground mt-1">Check out our latest pet-themed merchandise</p>
          </div>
          <Link to="/shop">
            <Button variant="outline" effect="shimmer" className="gap-2">
              View All <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-1000 delay-200 ${productsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {products.slice(0, 3).map((product, index) => (
            <Card 
              key={product.id} 
              className="group card-glow card-lift overflow-hidden glass-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-square overflow-hidden img-shine">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold group-hover:text-primary transition-colors">{product.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                  {product.description}
                </p>
                <p className="text-lg font-bold text-gradient mt-2">
                  ${product.price.toFixed(2)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* YouTube Section */}
      <section className="bg-secondary/30 py-16 relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        
        <div className="container mx-auto px-4" ref={youtubeRef}>
          <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 transition-all duration-1000 ${youtubeVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="h-8 w-8 rounded-full bg-red-600 flex items-center justify-center">
                  <Youtube className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-medium text-red-500">YouTube Channel</span>
              </div>
              <h2 className="text-3xl font-bold">Latest Videos</h2>
              <p className="text-muted-foreground mt-1">Subscribe for more pet photography content</p>
            </div>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="neon" className="gap-2">
                <Youtube className="h-4 w-4" />
                Subscribe
              </Button>
            </a>
          </div>
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-1000 delay-200 ${youtubeVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {youtubeVideos.map((video, index) => (
              <a
                key={video.id}
                href={`https://youtube.com/watch?v=${video.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative aspect-video rounded-xl overflow-hidden img-shine">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="h-14 w-14 rounded-full bg-red-600 flex items-center justify-center shadow-lg shadow-red-600/50 group-hover:scale-110 transition-transform">
                      <Youtube className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  {/* Play Button Glow */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="h-20 w-20 rounded-full bg-red-600/20 blur-xl" />
                  </div>
                </div>
                <h3 className="font-medium mt-3 line-clamp-2 group-hover:text-primary transition-colors">
                  {video.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {video.views} views • {video.date}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Adoption Section */}
      <section className="container mx-auto px-4" ref={adoptionRef}>
        <div className={`flex items-center justify-between mb-8 transition-all duration-1000 ${adoptionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div>
            <h2 className="text-3xl font-bold">Pets for Adoption</h2>
            <p className="text-muted-foreground mt-1">Give a loving home to these adorable pets</p>
          </div>
          <Link to="/adoption">
            <Button variant="gradient-border" effect="shimmer" className="gap-2">
              View All <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-1000 delay-200 ${adoptionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {pets.slice(0, 4).map((pet, index) => (
            <Card 
              key={pet.id} 
              className="group card-glow card-lift overflow-hidden glass-card relative"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-square overflow-hidden img-shine">
                <img
                  src={pet.image}
                  alt={pet.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <Badge
                  className="absolute top-3 right-3 backdrop-blur-sm"
                  variant={pet.status === 'available' ? 'default' : 'secondary'}
                >
                  {pet.status === 'available' ? 'Available' : 'Pending'}
                </Badge>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{pet.name}</h3>
                <p className="text-sm text-muted-foreground">{pet.breed}</p>
                <p className="text-sm text-muted-foreground">{pet.age} • {pet.gender}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4" ref={ctaRef}>
        <div className={`relative rounded-2xl overflow-hidden transition-all duration-1000 ${ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <img
            src="/photoshoot-hero.jpg"
            alt="Book a photoshoot"
            className="w-full h-[400px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-transparent flex items-center">
            <div className="px-8 md:px-16 max-w-xl space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Ready to Capture Your Pet's Personality?
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Book a professional pet photography session today and create memories
                that will last a lifetime.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/photoshoot">
                  <Button size="lg" variant="glow" className="gap-2">
                    <Calendar className="h-5 w-5" />
                    Book Now
                  </Button>
                </Link>
                <Link to="/about">
                  <Button size="lg" variant="gradient-border">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Decorative Glow */}
          <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
        </div>
      </section>
    </div>
  );
}
