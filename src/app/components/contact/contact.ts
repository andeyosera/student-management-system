import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css']
})
export class ContactComponent {
  @Output() navigate = new EventEmitter<string>();

  contactForm = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  submitted = false;

  contactInfo = [
    {
      icon: '📍',
      title: 'Address',
      content: '123 Education Street, Nairobi, Kenya'
    },
    {
      icon: '📞',
      title: 'Phone',
      content: '+254 700 000 000'
    },
    {
      icon: '📧',
      title: 'Email',
      content: 'info@schoolhub.com'
    },
    {
      icon: '⏰',
      title: 'Working Hours',
      content: 'Mon - Fri: 8:00 AM - 5:00 PM'
    }
  ];

  submitForm() {
    if (this.contactForm.name && this.contactForm.email && this.contactForm.message) {
      // In a real app, you'd send this to a backend
      console.log('Form submitted:', this.contactForm);
      this.submitted = true;
      
      // Reset form after 3 seconds
      setTimeout(() => {
        this.contactForm = {
          name: '',
          email: '',
          subject: '',
          message: ''
        };
        this.submitted = false;
      }, 3000);
    }
  }

  goToHome() {
    this.navigate.emit('home');
  }
}