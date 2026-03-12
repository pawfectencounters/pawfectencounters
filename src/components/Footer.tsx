import { Link } from 'react-router-dom';
import { Youtube, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { navItems } from '@/data';

export function Footer() {
  return (
    <footer className="bg-secondary/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="Pawfect Encounters" className="h-12 w-auto" />
            </div>
            <p className="text-sm text-muted-foreground">
              Street pet photography capturing the unique personalities of our furry friends.
              Every encounter is pawfect.
            </p>
            <div className="flex gap-3">
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-background flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-background flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="mailto:hello@pawfectencounters.com"
                className="h-10 w-10 rounded-full bg-background flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/photoshoot"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Pet Photography
                </Link>
              </li>
              <li>
                <Link
                  to="/adoption"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Pet Adoption
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Pet Merchandise
                </Link>
              </li>
              <li>
                <Link
                  to="/youtube"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Video Content
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>123 Pet Street, New York, NY 10001</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 shrink-0" />
                <span>hello@pawfectencounters.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Pawfect Encounters. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
