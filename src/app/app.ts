import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar';
import { LandingComponent } from './components/landing/landing';
import { AboutComponent } from './components/about/about';
import { ContactComponent } from './components/contact/contact';
import { DashboardComponent } from './components/dashboard/dashboard';
import { StudentsComponent } from './components/students/students';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    NavbarComponent, 
    LandingComponent,
    AboutComponent,
    ContactComponent,
    DashboardComponent, 
    StudentsComponent
  ],
  templateUrl: './app.html'
})
export class AppComponent {
  currentPage = 'home';

  onPageChange(page: string) {
    this.currentPage = page;
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}