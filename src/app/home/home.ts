import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  standalone: false
})
export class Home implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('heroVideo') heroVideo!: ElementRef<HTMLVideoElement>;
  @ViewChild('featuresSection') featuresSection!: ElementRef<HTMLElement>;

  // Video controls
  isPlaying: boolean = false;
  isMuted: boolean = true; // Start muted for autoplay policies
  volume: number = 0.25; // Default volume at 25%
  
  // Newsletter
  email: string = '';

  constructor() {}

  ngOnInit() {
    // Initialize with default volume
    this.volume = 0.25;
  }

  ngAfterViewInit() {
    // Set initial volume and mute state
    this.setupVideo();
  }

  ngOnDestroy() {
    // Clean up: pause video when leaving page
    if (this.heroVideo && this.heroVideo.nativeElement) {
      this.heroVideo.nativeElement.pause();
    }
  }

  setupVideo() {
    if (this.heroVideo && this.heroVideo.nativeElement) {
      const video = this.heroVideo.nativeElement;
      
      // Set initial volume
      video.volume = this.volume;
      video.muted = this.isMuted;

      // Try to autoplay (browsers may block this without user interaction)
      this.tryAutoplay();

      // Update playing state based on video events
      video.addEventListener('play', () => {
        this.isPlaying = true;
      });

      video.addEventListener('pause', () => {
        this.isPlaying = false;
      });

      video.addEventListener('volumechange', () => {
        this.volume = video.volume;
        this.isMuted = video.muted;
      });
    }
  }

  tryAutoplay() {
    if (this.heroVideo && this.heroVideo.nativeElement) {
      const video = this.heroVideo.nativeElement;
      
      const playPromise = video.play();
      
      if (playPromise !== undefined) {
        playPromise.then(() => {
          this.isPlaying = true;
        }).catch(error => {
          // Autoplay was prevented, show play button
          this.isPlaying = false;
          console.log('Autoplay prevented:', error);
        });
      }
    }
  }

  togglePlay() {
    if (this.heroVideo && this.heroVideo.nativeElement) {
      const video = this.heroVideo.nativeElement;
      
      if (video.paused) {
        const playPromise = video.play();
        
        if (playPromise !== undefined) {
          playPromise.then(() => {
            this.isPlaying = true;
          }).catch(error => {
            console.log('Play prevented:', error);
          });
        }
      } else {
        video.pause();
        this.isPlaying = false;
      }
    }
  }

  toggleMute() {
    if (this.heroVideo && this.heroVideo.nativeElement) {
      const video = this.heroVideo.nativeElement;
      video.muted = !video.muted;
      this.isMuted = video.muted;
      
      // If unmuting, restore the volume
      if (!video.muted) {
        video.volume = this.volume;
      }
    }
  }

  onVolumeChange() {
    if (this.heroVideo && this.heroVideo.nativeElement) {
      const video = this.heroVideo.nativeElement;
      video.volume = this.volume;
      
      // If volume > 0, unmute automatically
      if (this.volume > 0) {
        video.muted = false;
        this.isMuted = false;
      }
    }
  }

  scrollToFeatures() {
    if (this.featuresSection) {
      this.featuresSection.nativeElement.scrollIntoView({ 
        behavior: 'smooth' 
      });
    }
  }

  addToCart(productName: string) {
    // In a real app, this would add to cart
    alert(`Added ${productName} to cart!`);
    
    // You could also trigger a cart service or event
    // const event = new CustomEvent('addToCart', { 
    //   detail: { product: productName, price: this.getPrice(productName) } 
    // });
    // window.dispatchEvent(event);
  }

  getPrice(productName: string): number {
    const prices: { [key: string]: number } = {
      'Chicken Inasal': 199,
      'Pork BBQ': 89,
      'Unli Rice': 49
    };
    return prices[productName] || 0;
  }

  onSubscribe() {
    if (this.email && this.validateEmail(this.email)) {
      alert(`Thank you for subscribing with: ${this.email}`);
      this.email = '';
    } else {
      alert('Please enter a valid email address');
    }
  }

  validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
}