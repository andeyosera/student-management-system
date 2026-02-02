import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {
  @Output() navigate = new EventEmitter<string>();

  email = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';
  successMessage = '';
  isLoading = false;

  constructor(private authService: AuthService) {}

  async register() {
    // Validation
    if (!this.email || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    if (this.password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const result = await this.authService.signUp(this.email, this.password);

    this.isLoading = false;

    if (result.success) {
      this.successMessage = 'Account created successfully! Redirecting to dashboard...';
      
      // Wait 2 seconds then navigate to dashboard
      setTimeout(() => {
        this.navigate.emit('dashboard');
      }, 2000);
    } else {
      this.errorMessage = result.error || 'Registration failed. Please try again.';
    }
  }

  goToLogin() {
    this.navigate.emit('login');
  }

  goToHome() {
    this.navigate.emit('home');
  }
}
