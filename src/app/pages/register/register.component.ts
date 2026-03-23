import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService, UserRole } from '../../services/auth.service';
import { LucideAngularModule, UserPlus, Mail, Lock, User, Shield, Briefcase, UserCircle } from 'lucide-angular';
import { ThemeToggleComponent } from '../../components/theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, LucideAngularModule, ThemeToggleComponent],
  template: `
    <div class="min-h-screen flex items-center justify-center p-6 bg-high-tech-black relative overflow-hidden transition-colors duration-300">
      <div class="absolute top-6 right-6 z-50">
        <app-theme-toggle></app-theme-toggle>
      </div>
      <!-- Decorative Background Elements -->
      <div class="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-high-tech-accent rounded-full blur-[120px]"></div>
        <div class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-high-tech-blue rounded-full blur-[120px]"></div>
      </div>

      <div class="w-full max-w-md glass-card p-8 animate-fade-in relative z-10">
        <div class="text-center mb-10">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-high-tech-accent/10 mb-6 border border-high-tech-accent/20">
            <lucide-icon [name]="UserPlus" class="w-8 h-8 text-high-tech-accent"></lucide-icon>
          </div>
          <h1 class="text-3xl font-bold mb-2">Create Account</h1>
          <p class="text-high-tech-gray-400 text-sm mono-label">Join our secure network</p>
        </div>

        <form (ngSubmit)="onSubmit()" #registerForm="ngForm" class="space-y-6">
          <div class="space-y-2">
            <label class="text-xs font-semibold text-high-tech-gray-400 uppercase tracking-widest block">Full Name</label>
            <div class="relative">
              <lucide-icon [name]="User" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-high-tech-gray-500"></lucide-icon>
              <input 
                type="text" 
                name="name" 
                [(ngModel)]="name" 
                required 
                class="w-full bg-high-tech-black border border-white/10 rounded-lg py-3 pl-10 pr-4 focus:border-high-tech-accent focus:ring-1 focus:ring-high-tech-accent outline-none transition-all text-sm"
                placeholder="John Doe"
              >
            </div>
          </div>

          <div class="space-y-2">
            <label class="text-xs font-semibold text-high-tech-gray-400 uppercase tracking-widest block">Email Address</label>
            <div class="relative">
              <lucide-icon [name]="Mail" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-high-tech-gray-500"></lucide-icon>
              <input 
                type="email" 
                name="email" 
                [(ngModel)]="email" 
                required 
                class="w-full bg-high-tech-black border border-white/10 rounded-lg py-3 pl-10 pr-4 focus:border-high-tech-accent focus:ring-1 focus:ring-high-tech-accent outline-none transition-all text-sm"
                placeholder="name@company.com"
              >
            </div>
          </div>

          <div class="space-y-2">
            <label class="text-xs font-semibold text-high-tech-gray-400 uppercase tracking-widest block">Select Role</label>
            <div class="grid grid-cols-3 gap-3">
              <button 
                type="button" 
                (click)="role = 'Admin'"
                [ngClass]="{'border-high-tech-accent bg-high-tech-accent/10': role === 'Admin'}"
                class="flex flex-col items-center justify-center p-3 border border-white/10 rounded-lg transition-all hover:bg-white/5"
              >
                <lucide-icon [name]="Shield" class="w-5 h-5 mb-2" [class.text-high-tech-accent]="role === 'Admin'"></lucide-icon>
                <span class="text-[10px] font-bold uppercase tracking-widest">Admin</span>
              </button>
              <button 
                type="button" 
                (click)="role = 'Manager'"
                [ngClass]="{'border-high-tech-blue bg-high-tech-blue/10': role === 'Manager'}"
                class="flex flex-col items-center justify-center p-3 border border-white/10 rounded-lg transition-all hover:bg-white/5"
              >
                <lucide-icon [name]="Briefcase" class="w-5 h-5 mb-2" [class.text-high-tech-blue]="role === 'Manager'"></lucide-icon>
                <span class="text-[10px] font-bold uppercase tracking-widest">Manager</span>
              </button>
              <button 
                type="button" 
                (click)="role = 'User'"
                [ngClass]="{'border-white/40 bg-white/10': role === 'User'}"
                class="flex flex-col items-center justify-center p-3 border border-white/10 rounded-lg transition-all hover:bg-white/5"
              >
                <lucide-icon [name]="UserCircle" class="w-5 h-5 mb-2" [class.text-white]="role === 'User'"></lucide-icon>
                <span class="text-[10px] font-bold uppercase tracking-widest">User</span>
              </button>
            </div>
          </div>

          <div class="space-y-2">
            <label class="text-xs font-semibold text-high-tech-gray-400 uppercase tracking-widest block">Password</label>
            <div class="relative">
              <lucide-icon [name]="Lock" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-high-tech-gray-500"></lucide-icon>
              <input 
                type="password" 
                name="password" 
                [(ngModel)]="password" 
                required 
                class="w-full bg-high-tech-black border border-white/10 rounded-lg py-3 pl-10 pr-4 focus:border-high-tech-accent focus:ring-1 focus:ring-high-tech-accent outline-none transition-all text-sm"
                placeholder="••••••••"
              >
            </div>
          </div>

          @if (success) {
            <div class="text-high-tech-accent text-xs p-3 bg-high-tech-accent/10 border border-high-tech-accent/20 rounded-lg animate-fade-in">
              Account created successfully! Redirecting to login...
            </div>
          }

          <button 
            type="submit" 
            [disabled]="registerForm.invalid || loading"
            class="w-full btn-primary flex items-center justify-center gap-2"
          >
            @if (!loading) {
              <span>Create Account</span>
            }
            @if (loading) {
              <span class="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></span>
            }
          </button>
        </form>

        <div class="mt-8 pt-8 border-t border-white/5 text-center">
          <p class="text-sm text-high-tech-gray-400">
            Already have an account? 
            <a routerLink="/login" class="text-high-tech-accent hover:underline font-medium">Sign In</a>
          </p>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  role: UserRole = 'User';
  loading = false;
  success = false;

  readonly UserPlus = UserPlus;
  readonly Mail = Mail;
  readonly Lock = Lock;
  readonly User = User;
  readonly Shield = Shield;
  readonly Briefcase = Briefcase;
  readonly UserCircle = UserCircle;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.loading = true;
    this.authService.register(this.name, this.email, this.role, this.password).subscribe(() => {
      this.loading = false;
      this.success = true;
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
    });
  }
}
