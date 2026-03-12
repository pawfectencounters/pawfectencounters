import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Info, Check } from 'lucide-react';
import { pets } from '@/data';
import type { Pet } from '@/types';

export function AdoptionPage() {
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [showApplyDialog, setShowApplyDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setShowApplyDialog(false);
    setShowSuccessDialog(true);
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center">
        <div className="absolute inset-0">
          <img
            src="/adoption-hero.jpg"
            alt="Pet Adoption"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Find Your Perfect Companion
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Every pet deserves a loving home. Browse our available pets and start
            the journey to finding your new best friend.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">How Adoption Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { step: '1', title: 'Browse', desc: 'Look through our available pets' },
            { step: '2', title: 'Apply', desc: 'Submit an adoption application' },
            { step: '3', title: 'Meet', desc: 'Schedule a meet and greet' },
            { step: '4', title: 'Adopt', desc: 'Welcome your new friend home' },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto mb-3">
                {item.step}
              </div>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Available Pets */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Available Pets</h2>
          <Badge variant="outline">
            {pets.filter(p => p.status === 'available').length} Available
          </Badge>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pets.map((pet) => (
            <Card key={pet.id} className="group overflow-hidden">
              <div className="aspect-square overflow-hidden relative">
                <img
                  src={pet.image}
                  alt={pet.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <Badge
                  className="absolute top-2 right-2"
                  variant={pet.status === 'available' ? 'default' : 'secondary'}
                >
                  {pet.status === 'available' ? 'Available' : 'Pending'}
                </Badge>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg">{pet.name}</h3>
                <p className="text-sm text-muted-foreground">{pet.breed}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                  <Calendar className="h-3 w-3" />
                  {pet.age}
                  <span className="mx-1">•</span>
                  {pet.gender === 'male' ? 'Boy' : 'Girl'}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
                  {pet.description}
                </p>
                <Button
                  className="w-full mt-4"
                  disabled={pet.status !== 'available'}
                  onClick={() => {
                    setSelectedPet(pet);
                    setShowApplyDialog(true);
                  }}
                >
                  {pet.status === 'available' ? 'Apply to Adopt' : 'Pending Adoption'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Adoption Info */}
      <section className="bg-secondary/30 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Why Adopt?</h2>
              <ul className="space-y-3">
                {[
                  'Save a life and give a pet a second chance',
                  'Adoption fees are typically lower than buying',
                  'Most pets are already vaccinated and spayed/neutered',
                  'You\'ll gain a loyal companion for life',
                  'Help reduce pet overpopulation',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-background rounded-xl p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Info className="h-5 w-5" />
                Adoption Requirements
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Must be 21 years or older</li>
                <li>• Valid ID and proof of address</li>
                <li>• Landlord approval (if renting)</li>
                <li>• Home visit may be required</li>
                <li>• Adoption fee applies</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Apply Dialog */}
      <Dialog open={showApplyDialog} onOpenChange={setShowApplyDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Apply to Adopt {selectedPet?.name}</DialogTitle>
            <DialogDescription>
              Fill out the form below and we'll get back to you within 48 hours.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleApply} className="space-y-4">
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
              <Label htmlFor="message">Why do you want to adopt {selectedPet?.name}?</Label>
              <Textarea id="message" rows={3} required />
            </div>
            <Button type="submit" className="w-full">
              Submit Application
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
          <DialogTitle className="text-xl">Application Submitted!</DialogTitle>
          <DialogDescription>
            Thank you for your interest in adopting {selectedPet?.name}. We'll review your application and contact you within 48 hours.
          </DialogDescription>
          <Button onClick={() => setShowSuccessDialog(false)} className="w-full mt-4">
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
