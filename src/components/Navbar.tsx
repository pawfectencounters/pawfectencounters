import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, ShoppingCart, Youtube, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { navItems } from '@/data';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
}

export function Navbar({ cartCount, onCartClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${
        scrolled 
          ? 'navbar-glass shadow-lg shadow-black/10' 
          : 'bg-transparent'
      }`}
    >
      {/* Top Glow Line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 transition-opacity duration-300" 
        style={{ opacity: scrolled ? 1 : 0 }} 
      />
      
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative">
            <img src="/logo.png" alt="Pawfect Encounters" className="h-10 w-auto transition-transform duration-300 group-hover:scale-105" />
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <span className="hidden sm:inline font-bold text-lg group-hover:text-primary transition-colors">
            Pawfect Encounters
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg group ${
                location.pathname === item.href 
                  ? 'text-primary bg-primary/10' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
              }`}
            >
              <span className="relative z-10">{item.label}</span>
              {/* Underline Animation */}
              <span className={`absolute bottom-1 left-4 right-4 h-0.5 bg-gradient-to-r from-primary to-orange-400 rounded-full transition-all duration-300 ${
                location.pathname === item.href ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`} />
              {/* Glow Effect */}
              <span className="absolute inset-0 rounded-lg bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* YouTube Link */}
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-red-500 transition-all duration-300 rounded-lg hover:bg-red-500/10 group"
          >
            <Youtube className="h-5 w-5 group-hover:scale-110 transition-transform" />
            <span className="hidden lg:inline">Subscribe</span>
          </a>

          {/* Cart Button */}
          <Button
            variant="ghost"
            size="icon"
            className="relative group hover:bg-primary/10 transition-colors"
            onClick={onCartClick}
          >
            <ShoppingCart className="h-5 w-5 group-hover:text-primary transition-colors" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-gradient-to-r from-primary to-orange-500 text-primary-foreground text-xs flex items-center justify-center font-bold shadow-lg shadow-primary/30 animate-bounce">
                {cartCount}
              </span>
            )}
            {/* Hover Glow */}
            <span className="absolute inset-0 rounded-full bg-primary/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
          </Button>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-background/95 backdrop-blur-xl border-l border-white/10">
              <div className="flex flex-col gap-2 mt-8">
                <div className="flex items-center gap-2 mb-6 px-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <span className="font-bold text-lg">Menu</span>
                </div>
                {navItems.map((item, index) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 text-base font-medium rounded-xl transition-all duration-300 ${
                      location.pathname === item.href 
                        ? 'text-primary bg-primary/10 border border-primary/20' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                    }`}
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 transition-opacity"
                      style={{ opacity: location.pathname === item.href ? 1 : 0 }}
                    />
                    {item.label}
                  </Link>
                ))}
                <div className="mt-4 pt-4 border-t border-white/10">
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 text-base font-medium rounded-xl text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-all"
                  >
                    <Youtube className="h-5 w-5" />
                    Subscribe on YouTube
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
