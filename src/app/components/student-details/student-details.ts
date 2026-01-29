import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-student-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-details.html',
  styleUrls: ['./student-details.css']
})
export class StudentDetailsComponent {
  @Input() student: any;
  @Output() close = new EventEmitter<void>();
  @Output() studentUpdated = new EventEmitter<void>();

  isEditMode = false;
  editedStudent: any = {};

  constructor(private supabaseService: SupabaseService) {}

  ngOnInit() {
    // Create a copy for editing
    this.editedStudent = { ...this.student };
  }

  enableEdit() {
    this.isEditMode = true;
  }

  cancelEdit() {
    this.isEditMode = false;
    this.editedStudent = { ...this.student };
  }

  async saveChanges() {
    const success = await this.supabaseService.updateStudent(this.student.id, this.editedStudent);
    
    if (success) {
      this.isEditMode = false;
      this.student = { ...this.editedStudent };
      this.studentUpdated.emit();
    }
  }

  async deleteStudent() {
    if (confirm(`Are you sure you want to delete ${this.student.first_name} ${this.student.last_name}?`)) {
      const success = await this.supabaseService.deleteStudent(this.student.id);
      
      if (success) {
        this.studentUpdated.emit();
        this.close.emit();
      }
    }
  }

  closeDetails() {
    this.close.emit();
  }

  getInitials(): string {
    return `${this.student.first_name.charAt(0)}${this.student.last_name.charAt(0)}`;
  }
}
