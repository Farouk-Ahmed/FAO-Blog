import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { LucideAngularModule, LayoutDashboard, Briefcase, Activity, Settings, LogOut, Bell, Search, Users, PieChart, TrendingUp, Calendar } from 'lucide-angular';
import { WelcomeModalComponent } from '../../../components/welcome-modal/welcome-modal.component';
import { ThemeToggleComponent } from '../../../components/theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-manager-dashboard',
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
          <div class="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center">
            <lucide-icon [name]="LayoutDashboard" class="w-6 h-6 text-black"></lucide-icon>
          </div>
          <span class="font-bold text-xl tracking-tight">TECH<span class="text-purple-500">OS</span></span>
        </div>

        <nav class="flex-1 space-y-2">
          <a class="flex items-center gap-3 p-3 rounded-xl bg-purple-500/10 text-purple-500 border border-purple-500/20">
            <lucide-icon [name]="LayoutDashboard" class="w-5 h-5"></lucide-icon>
            <span class="font-medium">Management Hub</span>
          </a>
          <a class="flex items-center gap-3 p-3 rounded-xl text-high-tech-gray-400 hover:bg-white/5 transition-all">
            <lucide-icon [name]="Users" class="w-5 h-5"></lucide-icon>
            <span class="font-medium">Team Overview</span>
          </a>
          <a class="flex items-center gap-3 p-3 rounded-xl text-high-tech-gray-400 hover:bg-white/5 transition-all">
            <lucide-icon [name]="Calendar" class="w-5 h-5"></lucide-icon>
            <span class="font-medium">Schedules</span>
          </a>
          <a class="flex items-center gap-3 p-3 rounded-xl text-high-tech-gray-400 hover:bg-white/5 transition-all">
            <lucide-icon [name]="Settings" class="w-5 h-5"></lucide-icon>
            <span class="font-medium">Settings</span>
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
            <p class="mono-label mb-1 text-purple-500">Project Management Console</p>
            <h1 class="text-4xl font-extrabold tracking-tight">Team Performance</h1>
          </div>
          <div class="flex items-center gap-4">
            <button class="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center relative hover:bg-white/10 transition-all">
              <lucide-icon [name]="Bell" class="w-5 h-5 text-high-tech-gray-400"></lucide-icon>
              <span class="absolute top-2 right-2 w-2 h-2 bg-purple-500 rounded-full"></span>
            </button>
            <div class="flex items-center gap-3 pl-4 border-l border-white/10">
              <div class="text-right hidden sm:block">
                <p class="text-sm font-bold">{{ user?.name }}</p>
                <p class="text-[10px] text-purple-500 uppercase tracking-widest font-bold">Manager</p>
              </div>
              <div class="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 p-[1px]">
                <div class="w-full h-full rounded-full bg-high-tech-black flex items-center justify-center overflow-hidden">
                  <img src="https://picsum.photos/seed/manager/100/100" alt="Avatar" class="w-full h-full object-cover">
                </div>
              </div>
            </div>
          </div>
        </header>

        <!-- Stats Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="glass-card p-6 space-y-4">
            <div class="flex items-center justify-between">
              <div class="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <lucide-icon [name]="Briefcase" class="w-5 h-5 text-purple-500"></lucide-icon>
              </div>
              <span class="text-xs font-bold text-high-tech-gray-400">Active</span>
            </div>
            <div>
              <p class="text-high-tech-gray-400 text-xs uppercase tracking-widest font-bold">Projects</p>
              <p class="text-3xl font-bold mt-1">12</p>
            </div>
          </div>
          <div class="glass-card p-6 space-y-4">
            <div class="flex items-center justify-between">
              <div class="w-10 h-10 rounded-lg bg-high-tech-accent/10 flex items-center justify-center">
                <lucide-icon [name]="Users" class="w-5 h-5 text-high-tech-accent"></lucide-icon>
              </div>
              <span class="text-xs font-bold text-high-tech-gray-400">Total</span>
            </div>
            <div>
              <p class="text-high-tech-gray-400 text-xs uppercase tracking-widest font-bold">Team Members</p>
              <p class="text-3xl font-bold mt-1">48</p>
            </div>
          </div>
          <div class="glass-card p-6 space-y-4">
            <div class="flex items-center justify-between">
              <div class="w-10 h-10 rounded-lg bg-high-tech-blue/10 flex items-center justify-center">
                <lucide-icon [name]="TrendingUp" class="w-5 h-5 text-high-tech-blue"></lucide-icon>
              </div>
              <span class="text-xs font-bold text-high-tech-accent">+15%</span>
            </div>
            <div>
              <p class="text-high-tech-gray-400 text-xs uppercase tracking-widest font-bold">Efficiency</p>
              <p class="text-3xl font-bold mt-1">88%</p>
            </div>
          </div>
          <div class="glass-card p-6 space-y-4">
            <div class="flex items-center justify-between">
              <div class="w-10 h-10 rounded-lg bg-high-tech-red/10 flex items-center justify-center">
                <lucide-icon [name]="Activity" class="w-5 h-5 text-high-tech-red"></lucide-icon>
              </div>
              <span class="text-xs font-bold text-high-tech-red">Critical</span>
            </div>
            <div>
              <p class="text-high-tech-gray-400 text-xs uppercase tracking-widest font-bold">Risk Level</p>
              <p class="text-3xl font-bold mt-1">Low</p>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Team Table -->
          <div class="lg:col-span-2 glass-card overflow-hidden">
            <div class="p-8 border-b border-white/5 flex items-center justify-between">
              <h3 class="text-xl font-bold">Team Performance</h3>
              <button class="btn-secondary text-xs py-2 px-4">Manage Team</button>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse">
                <thead>
                  <tr class="bg-white/[0.02]">
                    <th class="p-4 text-[10px] font-bold uppercase tracking-widest text-high-tech-gray-400 border-b border-white/5">Member</th>
                    <th class="p-4 text-[10px] font-bold uppercase tracking-widest text-high-tech-gray-400 border-b border-white/5">Role</th>
                    <th class="p-4 text-[10px] font-bold uppercase tracking-widest text-high-tech-gray-400 border-b border-white/5">Status</th>
                    <th class="p-4 text-[10px] font-bold uppercase tracking-widest text-high-tech-gray-400 border-b border-white/5">Performance</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-white/5">
                  @for (member of team; track member.name) {
                    <tr class="hover:bg-white/[0.01] transition-all">
                      <td class="p-4">
                        <div class="flex items-center gap-3">
                          <div class="w-8 h-8 rounded-full bg-white/5 overflow-hidden">
                            <img [src]="'https://picsum.photos/seed/' + member.name + '/32/32'" alt="Avatar">
                          </div>
                          <span class="text-sm font-medium">{{ member.name }}</span>
                        </div>
                      </td>
                      <td class="p-4 text-sm text-high-tech-gray-400">{{ member.role }}</td>
                      <td class="p-4">
                        <span [class]="'px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ' + 
                          (member.status === 'Active' ? 'bg-high-tech-accent/10 text-high-tech-accent' : 'bg-yellow-500/10 text-yellow-500')">
                          {{ member.status }}
                        </span>
                      </td>
                      <td class="p-4">
                        <div class="flex items-center gap-3">
                          <div class="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                            <div class="h-full bg-purple-500" [style.width]="member.score + '%'"></div>
                          </div>
                          <span class="text-xs font-mono">{{ member.score }}%</span>
                        </div>
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>

          <!-- Project Distribution -->
          <div class="glass-card p-8">
            <h3 class="text-xl font-bold mb-6">Resource Allocation</h3>
            <div class="flex flex-col gap-6">
              <div class="space-y-2">
                <div class="flex justify-between text-sm">
                  <span class="font-medium">Development</span>
                  <span class="text-purple-500 font-bold">60%</span>
                </div>
                <div class="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div class="h-full bg-purple-500 w-[60%]"></div>
                </div>
              </div>
              <div class="space-y-2">
                <div class="flex justify-between text-sm">
                  <span class="font-medium">Design</span>
                  <span class="text-high-tech-blue font-bold">25%</span>
                </div>
                <div class="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div class="h-full bg-high-tech-blue w-[25%]"></div>
                </div>
              </div>
              <div class="space-y-2">
                <div class="flex justify-between text-sm">
                  <span class="font-medium">QA Testing</span>
                  <span class="text-high-tech-accent font-bold">15%</span>
                </div>
                <div class="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div class="h-full bg-high-tech-accent w-[15%]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <footer class="pt-10 pb-6 border-t border-white/5 text-center">
          <p class="text-sm text-high-tech-gray-400">
            &copy; 2026 TECH-OS. Developed by <span class="text-purple-500 font-medium">Farouk Ahmed</span>
          </p>
        </footer>
      </main>
    </div>
  `,
  styles: []
})
export class ManagerDashboardComponent implements OnInit {
  user: any;
  showWelcome = true;

  readonly LayoutDashboard = LayoutDashboard;
  readonly Briefcase = Briefcase;
  readonly Activity = Activity;
  readonly Settings = Settings;
  readonly LogOut = LogOut;
  readonly Bell = Bell;
  readonly Search = Search;
  readonly Users = Users;
  readonly PieChart = PieChart;
  readonly TrendingUp = TrendingUp;
  readonly Calendar = Calendar;

  team = [
    { name: 'David Kim', role: 'Lead Developer', status: 'Active', score: 95 },
    { name: 'Lisa Wong', role: 'UI Designer', status: 'Active', score: 88 },
    { name: 'James Wilson', role: 'Backend Engineer', status: 'Away', score: 92 },
    { name: 'Anna Smith', role: 'QA Analyst', status: 'Active', score: 84 },
    { name: 'Tom Brown', role: 'Project Coordinator', status: 'Active', score: 90 },
  ];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.user = this.authService.currentUserValue;
  }

  logout() {
    this.authService.logout();
  }
}
