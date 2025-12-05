import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";

interface Products {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category: string;
}

@Component({
  selector: 'app-product',
  imports: [CommonModule, RouterLink],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product implements OnInit {

   cartCount = 3;
  
  // Product data
  bestsellers: Products[] = [
    {
      id: 1,
      name: 'Chicken Inasal',
      price: 120.00,
      description: 'Tender chicken leg quarter marinated in calamansi, garlic, and annatto, grilled to smoky perfection.',
      imageUrl: './img/Chicken-Inasal.png',
      category: 'bestsellers'
    },
    {
      id: 2,
      name: 'Pork BBQ',
      price: 85.00,
      description: 'Juicy pork skewers glazed in sweet-savory barbecue sauce, grilled over open flame.',
      imageUrl: './img/porkBBQ.webp',
      category: 'bestsellers'
    },
    {
      id: 3,
      name: 'Halo-Halo',
      price: 99.00,
      description: 'A refreshing Filipino dessert with crushed ice, sweet beans, leche flan, ube, and creamy milk.',
      imageUrl: './img/Halo-halo.png',
      category: 'bestsellers'
    },
    {
      id: 4,
      name: 'Palabok',
      price: 110.00,
      description: 'Savory rice noodles topped with garlic sauce, shrimp, chicharrón, and egg — a comforting Pinoy classic.',
      imageUrl: './img/Palabok.png',
      category: 'bestsellers'
    },
    {
      id: 5,
      name: 'Bangus Sisig',
      price: 150.00,
      description: 'Sizzling boneless milkfish flakes sautéed with onions and chili, served on a hot plate with a citrusy kick.',
      imageUrl: './img/bangusSISIG.png',
      category: 'bestsellers'
    },
    {
      id: 6,
      name: 'Pork Sisig',
      price: 160.00,
      description: 'Crispy chopped pork cheeks and liver tossed with onions, chili, and calamansi — a sizzling, savory delight.',
      imageUrl: './img/PorkSisig.png',
      category: 'bestsellers'
    }
  ];

  favorites: Products[] = [
    {
      id: 7,
      name: 'Sizzling Liempo',
      price: 145.00,
      description: 'Thick-cut pork belly grilled and served sizzling with savory sauce and a side of calamansi.',
      imageUrl: './img/Sizzling-Liempo.png',
      category: 'favorites'
    },
    {
      id: 8,
      name: 'Grilled Liempo',
      price: 140.00,
      description: 'Marinated pork belly grilled to a smoky char, tender on the inside and crisp on the outside.',
      imageUrl: './img/Grilled-Liempo.webp',
      category: 'favorites'
    },
    {
      id: 9,
      name: 'Pork BBQ Fiesta',
      price: 250.00,
      description: 'A combo of 2 pork BBQ sticks, lumpiang togue, palabok, java rice, and soup — a true fiesta on a plate.',
      imageUrl: './img/bbqfiesta.webp',
      category: 'favorites'
    },
    {
      id: 10,
      name: 'TSM Pecho',
      price: 157.00,
      description: 'Tender pecho (chicken breast) meal with rice and soup — a Mang Inasal signature for hearty eaters.',
      imageUrl: './img/TSM-pecho.png',
      category: 'favorites'
    },
    {
      id: 11,
      name: 'Chicken Inasal Family Size',
      price: 899.00,
      description: 'A generous serving of Chicken Inasal perfect for sharing — marinated and grilled to perfection.',
      imageUrl: './img/Chicken-Inasal-Regular-Family-Size.png',
      category: 'favorites'
    },
    {
      id: 12,
      name: 'Family Fiesta Combo',
      price: 499.00,
      description: 'A festive bundle of grilled favorites, sides, and rice — ideal for family gatherings or barkada meals.',
      imageUrl: './img/family fiesta.webp',
      category: 'favorites'
    },
    {
      id: 13,
      name: 'Palabok and Chicken Inasal',
      price: 296.00,
      description: 'A satisfying duo of savory palabok and smoky Chicken Inasal — the best of both worlds on one plate.',
      imageUrl: './img/Palabok-and-Chicken-Inasal.png',
      category: 'favorites'
    }
  ];

  constructor() {}

  ngOnInit(): void {
    this.setupScrollAnimations();
  }

  setupScrollAnimations(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-up', 'opacity-100');
          }
        });
      },
      { threshold: 0.2 }
    );

    setTimeout(() => {
      document.querySelectorAll('.fade-in-on-scroll').forEach((el) => {
        observer.observe(el);
      });
    }, 100);
  }

  addToCart(product: Products): void {
    this.cartCount++;
    
    // Show success message
    const button = event?.target as HTMLElement;
    const originalText = button.textContent;
    button.textContent = '✓ ADDED!';
    button.classList.remove('bg-yellow-500', 'hover:bg-yellow-600');
    button.classList.add('bg-green-500', 'hover:bg-green-600');
    
    // Reset button after 2 seconds
    setTimeout(() => {
      button.textContent = originalText;
      button.classList.remove('bg-green-500', 'hover:bg-green-600');
      button.classList.add('bg-yellow-500', 'hover:bg-yellow-600');
    }, 2000);
    
    // You would typically call a service here
    console.log(`Added ${product.name} to cart - ₱${product.price}`);
  }

  formatPrice(price: number): string {
    return `₱${price.toFixed(2)}`;
  }
}
