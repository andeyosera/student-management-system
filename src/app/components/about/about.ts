import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrls: ['./about.css']
})
export class AboutComponent {
  @Output() navigate = new EventEmitter<string>();

  teamMembers = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Principal',
      image: '👩‍🏫',
      description: '20+ years of educational leadership'
    },
    {
      name: 'Michael Chen',
      role: 'IT Director',
      image: '👨‍💻',
      description: 'Technology integration specialist'
    },
    {
      name: 'Emily Brown',
      role: 'Academic Dean',
      image: '👩‍🎓',
      description: 'Curriculum development expert'
    },
    {
      name: 'James Wilson',
      role: 'Student Affairs',
      image: '👨‍🏫',
      description: 'Student support & counseling'
    }
  ];

  values = [
    {
      icon: '🎯',
      title: 'Excellence',
      description: 'Committed to the highest standards in education'
    },
    {
      icon: '🤝',
      title: 'Collaboration',
      description: 'Working together for student success'
    },
    {
      icon: '💡',
      title: 'Innovation',
      description: 'Embracing modern educational technology'
    },
    {
      icon: '❤️',
      title: 'Care',
      description: 'Supporting every student\'s journey'
    }
  ];

  goToContact() {
    this.navigate.emit('contact');
  }

  goToHome() {
    this.navigate.emit('home');
  }
}
