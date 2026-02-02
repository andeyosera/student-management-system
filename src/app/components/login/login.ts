import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  @Output() navigate = new EventEmitter<string>();

  email = '';
  password = '';
  errorMessage = '';
  isLoading = false;

  constructor(private authService: AuthService) {}

  async login() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Please enter both email and password';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const result = await this.authService.signIn(this.email, this.password);

    this.isLoading = false;

    if (result.success) {
      // Navigate to dashboard on successful login
      this.navigate.emit('dashboard');
    } else {
      this.errorMessage = result.error || 'Login failed. Please try again.';
    }
  }

  goToRegister() {
    this.navigate.emit('register');
  }

  goToHome() {
    this.navigate.emit('home');
  }
}