import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private supabase: SupabaseClient;
  private currentUser: User | null = null;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
    this.loadUser();
  }

  // Load current user from session
  private async loadUser() {
    const { data } = await this.supabase.auth.getUser();
    this.currentUser = data.user;
  }

  // Register new user
  async signUp(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password
    });

    if (error) {
      console.error('Sign up error:', error);
      return { success: false, error: error.message };
    }

    this.currentUser = data.user;
    return { success: true, user: data.user };
  }

  // Login user
  async signIn(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      console.error('Sign in error:', error);
      return { success: false, error: error.message };
    }

    this.currentUser = data.user;
    return { success: true, user: data.user };
  }

  // Logout user
  async signOut() {
    const { error } = await this.supabase.auth.signOut();
    
    if (error) {
      console.error('Sign out error:', error);
      return false;
    }

    this.currentUser = null;
    return true;
  }

  // Check if user is logged in
  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  // Get current user
  getCurrentUser(): User | null {
    return this.currentUser;
  }

  // Get user email
  getUserEmail(): string {
    return this.currentUser?.email || '';
  }
}