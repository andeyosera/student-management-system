import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent {
  @Output() pageChange = new EventEmitter<string>();
  currentPage = 'dashboard';

  navigate(page: string) {
    this.currentPage = page;
    this.pageChange.emit(page);
  }
}
