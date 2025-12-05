import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface ContactMessage {
  name: string;
  phone: string;
  email: string;
  message: string;
  date?: Date;
}


@Component({
  selector: 'app-contact',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
   contactData: ContactMessage = {
    name: '',
    phone: '',
    email: '',
    message: ''
  };

  contactInfo = {
    email: 'contact@manginasal.com',
    phone: '(02) 8888-9999',
    address: 'Mang Inasal Corporate Office, 10th Floor, Jollibee Plaza, Emerald Ave., Ortigas Center, Pasig City, Metro Manila',
    businessHours: {
      weekdays: '9:00 AM - 8:00 PM',
      weekends: '10:00 AM - 6:00 PM'
    }
  };

  branches = [
    {
      name: 'SM Megamall Branch',
      address: 'Ground Floor, Mega Atrium, SM Megamall, Mandaluyong City',
      phone: '(02) 1234-5678',
      hours: '10:00 AM - 9:00 PM'
    },
    {
      name: 'Robinsons Place Manila',
      address: '2nd Floor, Midtown Wing, Robinsons Place Manila, Ermita',
      phone: '(02) 2345-6789',
      hours: '10:00 AM - 9:00 PM'
    },
    {
      name: 'Trinoma Branch',
      address: '3rd Floor, Trinoma Mall, Quezon City',
      phone: '(02) 3456-7890',
      hours: '10:00 AM - 9:00 PM'
    },
    {
      name: 'SM Mall of Asia',
      address: 'By the Bay, SM Mall of Asia, Pasay City',
      phone: '(02) 4567-8901',
      hours: '10:00 AM - 10:00 PM'
    }
  ];

  faqs = [
    {
      question: 'How can I apply for a franchise?',
      answer: 'Visit our official franchise portal at franchise.manginasal.com or email franchise@manginasal.com for requirements and application process.'
    },
    {
      question: 'Do you offer catering services?',
      answer: 'Yes! We offer catering for events and gatherings. Please contact our catering hotline at (02) 8888-7777 at least 3 days in advance.'
    },
    {
      question: 'How can I provide feedback about my experience?',
      answer: 'We value your feedback. You can email us at feedback@manginasal.com or fill out our customer feedback form on our website.'
    },
    {
      question: 'Do you have delivery service?',
      answer: 'Yes, we partner with major food delivery platforms. You can also call your nearest branch for direct delivery inquiries.'
    }
  ];

  isSubmitting = false;
  isSubmitted = false;
  submissionError = '';

  ngOnInit(): void {
    this.setupAnimations();
  }

  setupAnimations(): void {
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

  onSubmit(): void {
    if (!this.isFormValid()) {
      return;
    }

    this.isSubmitting = true;
    this.submissionError = '';

    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', this.contactData);
      
      // Add date to submission
      const submission: ContactMessage = {
        ...this.contactData,
        date: new Date()
      };
      
      this.isSubmitting = false;
      this.isSubmitted = true;
      
      // Reset form after 3 seconds
      setTimeout(() => {
        this.resetForm();
      }, 3000);
      
    }, 1500);
  }

  isFormValid(): boolean {
    if (!this.contactData.name.trim()) {
      this.submissionError = 'Please enter your name';
      return false;
    }
    
    if (!this.contactData.phone.trim() || !this.isValidPhone(this.contactData.phone)) {
      this.submissionError = 'Please enter a valid phone number';
      return false;
    }
    
    if (!this.contactData.email.trim() || !this.isValidEmail(this.contactData.email)) {
      this.submissionError = 'Please enter a valid email address';
      return false;
    }
    
    if (!this.contactData.message.trim() || this.contactData.message.length < 10) {
      this.submissionError = 'Please enter a message with at least 10 characters';
      return false;
    }
    
    return true;
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  isValidPhone(phone: string): boolean {
    const phoneRegex = /^(09|\+639)\d{9}$/;
    return phoneRegex.test(phone.replace(/\D/g, ''));
  }

  resetForm(): void {
    this.contactData = {
      name: '',
      phone: '',
      email: '',
      message: ''
    };
    this.isSubmitted = false;
    this.submissionError = '';
  }

  formatPhoneInput(event: any): void {
    let value = event.target.value.replace(/\D/g, '');
    
    if (value.length > 0 && value.length <= 11) {
      if (value.length <= 3) {
        value = value.replace(/(\d{0,3})/, '$1');
      } else if (value.length <= 7) {
        value = value.replace(/(\d{3})(\d{0,4})/, '$1-$2');
      } else {
        value = value.replace(/(\d{3})(\d{4})(\d{0,4})/, '$1-$2-$3');
      }
    }
    
    this.contactData.phone = value;
  }

  copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text).then(() => {
      // Show success message
      const button = event?.target as HTMLElement;
      const originalText = button.innerHTML;
      button.innerHTML = '<i class="fas fa-check"></i> Copied!';
      button.classList.add('bg-green-500');
      
      setTimeout(() => {
        button.innerHTML = originalText;
        button.classList.remove('bg-green-500');
      }, 2000);
    });
  }

  callPhone(phone: string): void {
    window.location.href = `tel:${phone.replace(/\D/g, '')}`;
  }

  sendEmail(email: string): void {
    window.location.href = `mailto:${email}`;
  }
}
