export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Pet {
  id: string;
  name: string;
  breed: string;
  age: string;
  gender: 'male' | 'female';
  description: string;
  image: string;
  status: 'available' | 'pending' | 'adopted';
}

export interface PhotoshootPackage {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  includes: string[];
  image: string;
}

export interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  views: string;
  date: string;
}

export interface NavItem {
  label: string;
  href: string;
}
