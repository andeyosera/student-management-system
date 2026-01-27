import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  totalStudents = 0;
  gradeBreakdown: { [key: string]: number } = {};
  recentStudents: any[] = [];

  constructor(private supabaseService: SupabaseService) {}

  async ngOnInit() {
    await this.loadDashboardData();
  }

  async loadDashboardData() {
    const students = await this.supabaseService.getStudents();
    
    // Total students
    this.totalStudents = students.length;
    
    // Grade breakdown
    this.gradeBreakdown = {};
    students.forEach(student => {
      const grade = student.grade || 'Not Assigned';
      this.gradeBreakdown[grade] = (this.gradeBreakdown[grade] || 0) + 1;
    });
    
    // Recent students (last 5 added)
    this.recentStudents = students
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 5);
  }

  getGrades(): string[] {
    return Object.keys(this.gradeBreakdown);
  }
}
