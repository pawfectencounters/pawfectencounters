import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { HomePage } from '@/sections/HomePage';
import { ShopPage } from '@/sections/ShopPage';
import { YouTubePage } from '@/sections/YouTubePage';
import { AdoptionPage } from '@/sections/AdoptionPage';
import { PhotoshootPage } from '@/sections/PhotoshootPage';
import { DonationPage } from '@/sections/DonationPage';
import { AboutPage } from '@/sections/AboutPage';
import { useCart } from '@/hooks/useCart';
import { Toaster } from '@/components/ui/sonner';

function App() {
  const {
    items,
    isOpen,
    setIsOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    totalItems,
    totalPrice,
  } = useCart();

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar
          cartCount={totalItems}
          onCartClick={() => setIsOpen(true)}
        />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage onAddToCart={addToCart} />} />
            <Route path="/youtube" element={<YouTubePage />} />
            <Route path="/adoption" element={<AdoptionPage />} />
            <Route path="/photoshoot" element={<PhotoshootPage />} />
            <Route path="/donate" element={<DonationPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>
        <Footer />
        <CartDrawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          items={items}
          onUpdateQuantity={updateQuantity}
          onRemove={removeFromCart}
          totalPrice={totalPrice}
        />
        <Toaster />
      </div>
    </BrowserRouter>
  );
}

export default App;
