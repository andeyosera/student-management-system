import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './students.html',
  styleUrls: ['./students.css']
})
export class StudentsComponent implements OnInit {
  students: any[] = [];
  
  newStudent = {
    first_name: '',
    last_name: '',
    email: '',
    date_of_birth: '',
    grade: ''
  };

  isEditMode = false;
  editingStudentId: number | null = null;

  constructor(private supabaseService: SupabaseService) {}

  async ngOnInit() {
    await this.loadStudents();
  }

  async loadStudents() {
    this.students = await this.supabaseService.getStudents();
  }

  async addStudent() {
    if (this.newStudent.first_name && this.newStudent.last_name && this.newStudent.email) {
      await this.supabaseService.addStudent(this.newStudent);
      
      // Reset form
      this.resetForm();
      
      // Reload students
      await this.loadStudents();
    }
  }

  async deleteStudent(id: number) {
    if (confirm('Are you sure you want to delete this student?')) {
      const success = await this.supabaseService.deleteStudent(id);
      
      if (success) {
        await this.loadStudents();
      }
    }
  }

  editStudent(student: any) {
    this.isEditMode = true;
    this.editingStudentId = student.id;
    
    // Fill the form with student data
    this.newStudent = {
      first_name: student.first_name,
      last_name: student.last_name,
      email: student.email,
      date_of_birth: student.date_of_birth || '',
      grade: student.grade || ''
    };
  }

  async updateStudent() {
    if (this.editingStudentId && this.newStudent.first_name && this.newStudent.last_name && this.newStudent.email) {
      await this.supabaseService.updateStudent(this.editingStudentId, this.newStudent);
      
      // Reset form and mode
      this.resetForm();
      
      // Reload students
      await this.loadStudents();
    }
  }

  resetForm() {
    this.newStudent = {
      first_name: '',
      last_name: '',
      email: '',
      date_of_birth: '',
      grade: ''
    };
    this.isEditMode = false;
    this.editingStudentId = null;
  }

  async saveStudent() {
    if (this.isEditMode) {
      await this.updateStudent();
    } else {
      await this.addStudent();
    }
  }
}