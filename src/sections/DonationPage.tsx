import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Heart, PawPrint, Home, Stethoscope, Utensils, Check, CreditCard, HeartHandshake } from 'lucide-react';

const donationAmounts = [10, 25, 50, 100, 200, 500];

const donationImpacts = [
  {
    icon: Utensils,
    amount: '$25',
    description: 'Feeds a rescue pet for one week',
  },
  {
    icon: Stethoscope,
    amount: '$50',
    description: 'Covers basic veterinary checkup',
  },
  {
    icon: Home,
    amount: '$100',
    description: 'Provides shelter for a month',
  },
  {
    icon: PawPrint,
    amount: '$200',
    description: 'Funds spay/neuter surgery',
  },
];

export function DonationPage() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(50);
  const [customAmount, setCustomAmount] = useState('');
  const [showThankYou, setShowThankYou] = useState(false);

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    setShowThankYou(true);
  };

  const finalAmount = selectedAmount || Number(customAmount) || 0;

  return (
    <div className="space-y-8 pb-20">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center">
        <div className="absolute inset-0">
          <img
            src="/donation-hero.jpg"
            alt="Support Pet Rescue"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary mb-6">
            <Heart className="h-4 w-4" />
            <span className="text-sm font-medium">Support Our Mission</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Help Us Save More Lives
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your donation directly supports pet rescue, medical care, and finding
            forever homes for animals in need.
          </p>
        </div>
      </section>

      {/* Impact Section */}
      <section className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">Your Impact</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {donationImpacts.map((impact) => (
            <Card key={impact.amount} className="bg-secondary/50 border-0">
              <CardContent className="p-6 text-center">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <impact.icon className="h-6 w-6 text-primary" />
                </div>
                <p className="text-2xl font-bold text-primary mb-2">{impact.amount}</p>
                <p className="text-sm text-muted-foreground">{impact.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Donation Form */}
      <section className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="border-0 bg-gradient-to-br from-secondary/80 to-secondary/40">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <HeartHandshake className="h-12 w-12 text-primary mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Make a Donation</h2>
                <p className="text-muted-foreground">
                  Every dollar helps us rescue and care for more animals
                </p>
              </div>

              <form onSubmit={handleDonate} className="space-y-6">
                {/* Amount Selection */}
                <div>
                  <Label className="mb-3 block">Select Amount</Label>
                  <div className="grid grid-cols-3 gap-3">
                    {donationAmounts.map((amount) => (
                      <Button
                        key={amount}
                        type="button"
                        variant={selectedAmount === amount ? 'default' : 'outline'}
                        className="h-14 text-lg"
                        onClick={() => {
                          setSelectedAmount(amount);
                          setCustomAmount('');
                        }}
                      >
                        ${amount}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Custom Amount */}
                <div>
                  <Label htmlFor="custom" className="mb-2 block">
                    Or enter custom amount
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                    <Input
                      id="custom"
                      type="number"
                      placeholder="Enter amount"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        setSelectedAmount(null);
                      }}
                      className="pl-8 h-14"
                    />
                  </div>
                </div>

                {/* Donor Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" className="h-12" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" className="h-12" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john@example.com" className="h-12" />
                </div>

                {/* Payment Method */}
                <div>
                  <Label className="mb-3 block">Payment Method</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <Button type="button" variant="outline" className="h-14 justify-start gap-3">
                      <CreditCard className="h-5 w-5" />
                      Credit Card
                    </Button>
                    <Button type="button" variant="outline" className="h-14 justify-start gap-3">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                      </svg>
                      PayPal
                    </Button>
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-14 text-lg"
                  disabled={finalAmount <= 0}
                >
                  <Heart className="h-5 w-5 mr-2" />
                  Donate ${finalAmount > 0 ? finalAmount : '0'}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  Your donation is tax-deductible. You will receive a receipt via email.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-secondary/30 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '$50K+', label: 'Raised in 2024' },
              { value: '500+', label: 'Pets Rescued' },
              { value: '200+', label: 'Donors' },
              { value: '100%', label: 'Goes to Animals' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Ways to Help */}
      <section className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">Other Ways to Help</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Volunteer',
              description: 'Help at our shelter events and adoption days',
              action: 'Learn More',
            },
            {
              title: 'Foster',
              description: 'Provide a temporary home for rescue pets',
              action: 'Apply to Foster',
            },
            {
              title: 'Share',
              description: 'Spread the word about our mission on social media',
              action: 'Share Now',
            },
          ].map((way) => (
            <Card key={way.title} className="border-0 bg-secondary/50">
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold text-lg mb-2">{way.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{way.description}</p>
                <Button variant="outline" size="sm">
                  {way.action}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Thank You Dialog */}
      <Dialog open={showThankYou} onOpenChange={setShowThankYou}>
        <DialogContent className="max-w-sm text-center">
          <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 text-primary" />
          </div>
          <DialogTitle className="text-xl">Thank You!</DialogTitle>
          <DialogDescription>
            Your generous donation of ${finalAmount} will help us continue our mission to rescue and care for animals in need.
          </DialogDescription>
          <p className="text-sm text-muted-foreground mt-2">
            A receipt has been sent to your email.
          </p>
          <Button onClick={() => setShowThankYou(false)} className="w-full mt-4">
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
