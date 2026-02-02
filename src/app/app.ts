import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar';
import { LandingComponent } from './components/landing/landing';
import { AboutComponent } from './components/about/about';
import { ContactComponent } from './components/contact/contact';
import { LoginComponent } from './components/login/login';
import { RegisterComponent } from './components/register/register';
import { DashboardComponent } from './components/dashboard/dashboard';
import { StudentsComponent } from './components/students/students';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    NavbarComponent, 
    LandingComponent,
    AboutComponent,
    ContactComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent, 
    StudentsComponent
  ],
  templateUrl: './app.html'
})
export class AppComponent {
  currentPage = 'home';

  constructor(private authService: AuthService) {
    // Check if user is already logged in on app start
    if (this.authService.isAuthenticated()) {
      this.currentPage = 'dashboard';
    }
  }

  onPageChange(page: string) {
    // Check authentication for protected pages
    if ((page === 'dashboard' || page === 'students') && !this.authService.isAuthenticated()) {
      // Redirect to login if trying to access protected pages without being logged in
      this.currentPage = 'login';
    } else {
      this.currentPage = page;
    }
    
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onLogout() {
    this.authService.signOut();
    this.currentPage = 'home';
  }
}