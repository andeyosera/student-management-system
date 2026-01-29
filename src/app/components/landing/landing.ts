import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing.html',
  styleUrls: ['./landing.css']
})
export class LandingComponent {
  @Output() navigate = new EventEmitter<string>();

  features = [
    {
      icon: '👥',
      title: 'Student Management',
      description: 'Efficiently manage student records, enrollment, and academic information in one place.'
    },
    {
      icon: '📊',
      title: 'Analytics Dashboard',
      description: 'Get real-time insights with comprehensive analytics and performance tracking.'
    },
    {
      icon: '📚',
      title: 'Course Management',
      description: 'Organize courses, assign students, and track progress effortlessly.'
    },
    {
      icon: '📝',
      title: 'Grades & Reports',
      description: 'Record grades, generate report cards, and monitor academic performance.'
    }
  ];

  stats = [
    { number: '1000+', label: 'Students' },
    { number: '50+', label: 'Teachers' },
    { number: '30+', label: 'Courses' },
    { number: '99%', label: 'Success Rate' }
  ];

  goToLogin() {
    this.navigate.emit('login');
  }

  goToAbout() {
    this.navigate.emit('about');
  }

  goToContact() {
    this.navigate.emit('contact');
  }
}
