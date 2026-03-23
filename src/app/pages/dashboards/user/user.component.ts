import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { LucideAngularModule, LayoutDashboard, User, Activity, Settings, LogOut, Bell, Search, Clock, CheckCircle, AlertCircle } from 'lucide-angular';
import { WelcomeModalComponent } from '../../../components/welcome-modal/welcome-modal.component';
import { ThemeToggleComponent } from '../../../components/theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, WelcomeModalComponent, ThemeToggleComponent],
  template: `
    <div class="min-h-screen bg-high-tech-black flex flex-col lg:flex-row transition-colors duration-300">
      @if (showWelcome) {
        <app-welcome-modal (close)="showWelcome = false"></app-welcome-modal>
      }

      <!-- Sidebar -->
      <aside class="w-full lg:w-64 border-r border-white/5 p-6 flex flex-col gap-8 bg-[var(--sidebar-bg)] z-20 transition-colors duration-300">
        <div class="flex items-center gap-3 px-2">
          <div class="w-10 h-10 bg-high-tech-blue rounded-xl flex items-center justify-center">
            <lucide-icon [name]="LayoutDashboard" class="w-6 h-6 text-black"></lucide-icon>
          </div>
          <span class="font-bold text-xl tracking-tight">TECH<span class="text-high-tech-blue">OS</span></span>
        </div>

        <nav class="flex-1 space-y-2">
          <a class="flex items-center gap-3 p-3 rounded-xl bg-high-tech-blue/10 text-high-tech-blue border border-high-tech-blue/20">
            <lucide-icon [name]="LayoutDashboard" class="w-5 h-5"></lucide-icon>
            <span class="font-medium">My Dashboard</span>
          </a>
          <a class="flex items-center gap-3 p-3 rounded-xl text-high-tech-gray-400 hover:bg-white/5 transition-all">
            <lucide-icon [name]="Activity" class="w-5 h-5"></lucide-icon>
            <span class="font-medium">My Activity</span>
          </a>
          <a class="flex items-center gap-3 p-3 rounded-xl text-high-tech-gray-400 hover:bg-white/5 transition-all">
            <lucide-icon [name]="Settings" class="w-5 h-5"></lucide-icon>
            <span class="font-medium">Profile Settings</span>
          </a>
        </nav>

        <div class="pt-6 border-t border-white/5 space-y-2">
          <div class="flex items-center justify-between p-3 rounded-xl text-high-tech-gray-400">
            <span class="text-xs font-bold uppercase tracking-widest">Theme</span>
            <app-theme-toggle></app-theme-toggle>
          </div>
          <button (click)="logout()" class="flex items-center gap-3 p-3 w-full rounded-xl text-high-tech-red hover:bg-high-tech-red/10 transition-all">
            <lucide-icon [name]="LogOut" class="w-5 h-5"></lucide-icon>
            <span class="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 p-6 lg:p-10 space-y-10 overflow-y-auto max-h-screen">
        <!-- Header -->
        <header class="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <p class="mono-label mb-1 text-high-tech-blue">Standard User Access</p>
            <h1 class="text-4xl font-extrabold tracking-tight">Personal Workspace</h1>
          </div>
          <div class="flex items-center gap-4">
            <button class="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center relative hover:bg-white/10 transition-all">
              <lucide-icon [name]="Bell" class="w-5 h-5 text-high-tech-gray-400"></lucide-icon>
              <span class="absolute top-2 right-2 w-2 h-2 bg-high-tech-blue rounded-full"></span>
            </button>
            <div class="flex items-center gap-3 pl-4 border-l border-white/10">
              <div class="text-right hidden sm:block">
                <p class="text-sm font-bold">{{ user?.name }}</p>
                <p class="text-[10px] text-high-tech-blue uppercase tracking-widest font-bold">User</p>
              </div>
              <div class="w-10 h-10 rounded-full bg-gradient-to-tr from-high-tech-blue to-purple-500 p-[1px]">
                <div class="w-full h-full rounded-full bg-high-tech-black flex items-center justify-center overflow-hidden">
                  <img src="https://picsum.photos/seed/user/100/100" alt="Avatar" class="w-full h-full object-cover">
                </div>
              </div>
            </div>
          </div>
        </header>

        <!-- Stats Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="glass-card p-6 flex items-center gap-6">
            <div class="w-12 h-12 rounded-2xl bg-high-tech-blue/10 flex items-center justify-center shrink-0">
              <lucide-icon [name]="CheckCircle" class="w-6 h-6 text-high-tech-blue"></lucide-icon>
            </div>
            <div>
              <p class="text-high-tech-gray-400 text-xs uppercase tracking-widest font-bold">Completed Tasks</p>
              <p class="text-2xl font-bold mt-1">128</p>
            </div>
          </div>
          <div class="glass-card p-6 flex items-center gap-6">
            <div class="w-12 h-12 rounded-2xl bg-yellow-500/10 flex items-center justify-center shrink-0">
              <lucide-icon [name]="Clock" class="w-6 h-6 text-yellow-500"></lucide-icon>
            </div>
            <div>
              <p class="text-high-tech-gray-400 text-xs uppercase tracking-widest font-bold">Pending Tasks</p>
              <p class="text-2xl font-bold mt-1">14</p>
            </div>
          </div>
          <div class="glass-card p-6 flex items-center gap-6">
            <div class="w-12 h-12 rounded-2xl bg-high-tech-accent/10 flex items-center justify-center shrink-0">
              <lucide-icon [name]="Activity" class="w-6 h-6 text-high-tech-accent"></lucide-icon>
            </div>
            <div>
              <p class="text-high-tech-gray-400 text-xs uppercase tracking-widest font-bold">Productivity</p>
              <p class="text-2xl font-bold mt-1">94%</p>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Recent Activity -->
          <div class="glass-card p-8">
            <h3 class="text-xl font-bold mb-6">Recent Activity</h3>
            <div class="space-y-6">
              @for (activity of activities; track activity.title) {
                <div class="flex gap-4">
                  <div class="shrink-0 mt-1">
                    <div [class]="'w-2 h-2 rounded-full ' + (activity.type === 'success' ? 'bg-high-tech-accent' : activity.type === 'warning' ? 'bg-yellow-500' : 'bg-high-tech-blue')"></div>
                  </div>
                  <div class="flex-1">
                    <p class="text-sm font-medium">{{ activity.title }}</p>
                    <p class="text-xs text-high-tech-gray-400 mt-1">{{ activity.time }}</p>
                  </div>
                </div>
              }
            </div>
            <button class="w-full btn-secondary mt-8 text-xs py-2">View Full History</button>
          </div>

          <!-- Project Progress -->
          <div class="glass-card p-8">
            <h3 class="text-xl font-bold mb-6">Project Progress</h3>
            <div class="space-y-8">
              @for (project of projects; track project.name) {
                <div class="space-y-3">
                  <div class="flex justify-between items-center">
                    <span class="text-sm font-bold">{{ project.name }}</span>
                    <span class="text-xs font-mono text-high-tech-blue">{{ project.progress }}%</span>
                  </div>
                  <div class="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div class="h-full bg-high-tech-blue transition-all duration-1000" [style.width]="project.progress + '%'"></div>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>

        <!-- Footer -->
        <footer class="pt-10 pb-6 border-t border-white/5 text-center">
          <p class="text-sm text-high-tech-gray-400">
            &copy; 2026 TECH-OS. Developed by <span class="text-high-tech-blue font-medium">Farouk Ahmed</span>
          </p>
        </footer>
      </main>
    </div>
  `,
  styles: []
})
export class UserDashboardComponent implements OnInit {
  user: any;
  showWelcome = true;

  readonly LayoutDashboard = LayoutDashboard;
  readonly User = User;
  readonly Activity = Activity;
  readonly Settings = Settings;
  readonly LogOut = LogOut;
  readonly Bell = Bell;
  readonly Search = Search;
  readonly Clock = Clock;
  readonly CheckCircle = CheckCircle;
  readonly AlertCircle = AlertCircle;

  activities = [
    { title: 'Completed security audit for Project Alpha', time: '2 hours ago', type: 'success' },
    { title: 'Updated profile information', time: '5 hours ago', type: 'info' },
    { title: 'System maintenance scheduled for tomorrow', time: '1 day ago', type: 'warning' },
    { title: 'New project assigned: Cyber-Security Protocol', time: '2 days ago', type: 'info' },
  ];

  projects = [
    { name: 'Core Infrastructure', progress: 85 },
    { name: 'User Authentication Module', progress: 100 },
    { name: 'Data Encryption Layer', progress: 45 },
    { name: 'API Gateway Integration', progress: 60 },
  ];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.user = this.authService.currentUserValue;
  }

  logout() {
    this.authService.logout();
  }
}
