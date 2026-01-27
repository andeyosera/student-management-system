import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar';
import { DashboardComponent } from './components/dashboard/dashboard';
import { StudentsComponent } from './components/students/students';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NavbarComponent, DashboardComponent, StudentsComponent],
  templateUrl: './app.html'
})
export class AppComponent {
  currentPage = 'dashboard';

  onPageChange(page: string) {
    this.currentPage = page;
  }
}