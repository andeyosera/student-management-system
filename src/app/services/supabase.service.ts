import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  // Get all students
  async getStudents() {
    const { data, error } = await this.supabase
      .from('students')
      .select('*');
    
    if (error) {
      console.error('Error fetching students:', error);
      return [];
    }
    return data;
  }

  // Add a new student
  async addStudent(student: any) {
    const { data, error } = await this.supabase
      .from('students')
      .insert([student])
      .select();
    
    if (error) {
      console.error('Error adding student:', error);
      return null;
    }
    return data;
  }
  // Delete a student
  async deleteStudent(id: number) {
    const { error } = await this.supabase
      .from('students')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting student:', error);
      return false;
    }
    return true;
  }
  // Update a student
  async updateStudent(id: number, student: any) {
    const { data, error } = await this.supabase
      .from('students')
      .update(student)
      .eq('id', id)
      .select();
    
    if (error) {
      console.error('Error updating student:', error);
      return null;
    }
    return data;
  }
  }
