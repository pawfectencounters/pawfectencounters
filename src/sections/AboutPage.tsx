import { Camera, Heart, Youtube, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function AboutPage() {
  return (
    <div className="space-y-8 pb-20">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center">
        <div className="absolute inset-0">
          <img
            src="/hero-main.jpg"
            alt="About Us"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Story</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Capturing the unique personalities of pets, one encounter at a time.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            At Pawfect Encounters, we believe every pet has a unique story worth telling.
            Through our street-style photography, we capture the authentic personalities of
            our furry friends while supporting pet rescue and adoption efforts. Our goal
            is to create lasting memories for pet owners and help rescue pets find their
            forever homes.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-secondary/30 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Camera, value: '1000+', label: 'Photo Sessions' },
              { icon: Heart, value: '200+', label: 'Pets Adopted' },
              { icon: Youtube, value: '50K+', label: 'Subscribers' },
              { icon: Users, value: '500+', label: 'Happy Clients' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Meet the Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            {
              name: 'Alex Johnson',
              role: 'Founder & Lead Photographer',
              bio: 'With over 10 years of experience in pet photography, Alex has a unique ability to capture the soul of every animal.',
              image: '/pet-1.jpg',
            },
            {
              name: 'Sarah Chen',
              role: 'Video Producer',
              bio: 'Sarah brings our pet stories to life through engaging video content for our YouTube channel.',
              image: '/pet-2.jpg',
            },
            {
              name: 'Mike Rodriguez',
              role: 'Adoption Coordinator',
              bio: 'Mike works closely with local shelters to help rescue pets find their perfect forever homes.',
              image: '/pet-3.jpg',
            },
          ].map((member) => (
            <Card key={member.name} className="overflow-hidden">
              <div className="aspect-square overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-4 text-center">
                <h3 className="font-semibold text-lg">{member.name}</h3>
                <p className="text-sm text-primary">{member.role}</p>
                <p className="text-sm text-muted-foreground mt-2">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Authenticity',
              desc: 'We capture real moments and genuine personalities, not staged poses.',
            },
            {
              title: 'Compassion',
              desc: 'Every pet deserves love and respect. We treat all animals with kindness.',
            },
            {
              title: 'Community',
              desc: 'We believe in giving back and supporting local rescue organizations.',
            },
          ].map((value) => (
            <Card key={value.title}>
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold text-xl mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="container mx-auto px-4">
        <div className="bg-primary text-primary-foreground rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto mb-6">
            Have questions about our services? Want to collaborate? We'd love to hear from you!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="mailto:hello@pawfectencounters.com"
              className="inline-flex items-center gap-2 bg-background text-foreground px-6 py-3 rounded-lg font-medium hover:bg-background/90 transition-colors"
            >
              Email Us
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
            >
              <Youtube className="h-5 w-5" />
              Subscribe
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
