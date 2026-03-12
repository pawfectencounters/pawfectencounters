import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Camera, Clock, Check, Calendar as CalendarIcon, Star, MapPin } from 'lucide-react';
import { photoshootPackages } from '@/data';

export function PhotoshootPage() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [date, setDate] = useState<Date>();
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    setShowBookingDialog(false);
    setShowSuccessDialog(true);
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center">
        <div className="absolute inset-0">
          <img
            src="/photoshoot-hero.jpg"
            alt="Pet Photography"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Professional Pet Photography
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Capture your pet's unique personality with our street-style photography sessions.
            Every encounter is pawfect.
          </p>
        </div>
      </section>

      {/* Packages */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Choose Your Package</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From quick mini sessions to full premium experiences, we have options
            to fit every need and budget.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {photoshootPackages.map((pkg, index) => (
            <Card
              key={pkg.id}
              className={`relative overflow-hidden ${
                index === 1 ? 'border-primary border-2' : ''
              }`}
            >
              {index === 1 && (
                <Badge className="absolute top-4 right-4 bg-primary">
                  Most Popular
                </Badge>
              )}
              <div className="aspect-video overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold">{pkg.name}</h3>
                <p className="text-muted-foreground text-sm mt-1">
                  {pkg.description}
                </p>
                <div className="flex items-center gap-2 mt-4">
                  <span className="text-3xl font-bold text-primary">
                    ${pkg.price}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                  <Clock className="h-4 w-4" />
                  {pkg.duration}
                </div>
                <ul className="space-y-2 mt-4">
                  {pkg.includes.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full mt-6"
                  variant={index === 1 ? 'default' : 'outline'}
                  onClick={() => {
                    setSelectedPackage(pkg.id);
                    setShowBookingDialog(true);
                  }}
                >
                  Book Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-secondary/30 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">Why Choose Pawfect Encounters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Camera, title: 'Professional Equipment', desc: 'High-end cameras and lighting' },
              { icon: Star, title: 'Experienced Photographer', desc: '10+ years of pet photography' },
              { icon: MapPin, title: 'Location Flexibility', desc: 'Studio or outdoor sessions' },
              { icon: Clock, title: 'Quick Turnaround', desc: 'Photos delivered within 1 week' },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">Our Work</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['/pet-1.jpg', '/pet-2.jpg', '/pet-3.jpg', '/pet-4.jpg'].map((src, i) => (
            <div key={i} className="aspect-square rounded-lg overflow-hidden">
              <img
                src={src}
                alt={`Portfolio ${i + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Booking Dialog */}
      <Dialog open={showBookingDialog} onOpenChange={setShowBookingDialog}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Book Your Photoshoot</DialogTitle>
            <DialogDescription>
              Fill out the details below and we'll confirm your booking.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleBook} className="space-y-4">
            <div className="space-y-2">
              <Label>Selected Package</Label>
              <Input
                value={photoshootPackages.find(p => p.id === selectedPackage)?.name || ''}
                disabled
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="tel" required />
            </div>
            <div className="space-y-2">
              <Label>Preferred Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, 'PPP') : 'Pick a date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="petName">Pet Name & Type</Label>
              <Input id="petName" placeholder="e.g., Max (Golden Retriever)" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea id="notes" rows={3} />
            </div>
            <Button type="submit" className="w-full">
              Request Booking
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="max-w-sm text-center">
          <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <DialogTitle className="text-xl">Booking Requested!</DialogTitle>
          <DialogDescription>
            Thank you for your booking request. We'll review it and send you a confirmation email within 24 hours.
          </DialogDescription>
          <Button onClick={() => setShowSuccessDialog(false)} className="w-full mt-4">
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
