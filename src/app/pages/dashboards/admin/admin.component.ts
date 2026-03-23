import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { LucideAngularModule, LayoutDashboard, Users, Activity, Settings, LogOut, TrendingUp, DollarSign, ShoppingCart, ArrowUpRight, ArrowDownRight, Bell, Search } from 'lucide-angular';
import { WelcomeModalComponent } from '../../../components/welcome-modal/welcome-modal.component';

import { ChartComponent } from '../../../components/chart/chart.component';
import { ThemeToggleComponent } from '../../../components/theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, WelcomeModalComponent, ChartComponent, ThemeToggleComponent],
  template: `
    <div class="min-h-screen bg-high-tech-black flex flex-col lg:flex-row transition-colors duration-300">
      @if (showWelcome) {
        <app-welcome-modal (close)="showWelcome = false"></app-welcome-modal>
      }

      <!-- Sidebar -->
      <aside class="w-full lg:w-64 border-r border-white/5 p-6 flex flex-col gap-8 bg-[var(--sidebar-bg)] z-20 transition-colors duration-300">
        <div class="flex items-center gap-3 px-2">
          <div class="w-10 h-10 bg-high-tech-accent rounded-xl flex items-center justify-center">
            <lucide-icon [name]="LayoutDashboard" class="w-6 h-6 text-black"></lucide-icon>
          </div>
          <span class="font-bold text-xl tracking-tight">TECH<span class="text-high-tech-accent">OS</span></span>
        </div>

        <nav class="flex-1 space-y-2">
          <a class="flex items-center gap-3 p-3 rounded-xl bg-high-tech-accent/10 text-high-tech-accent border border-high-tech-accent/20">
            <lucide-icon [name]="LayoutDashboard" class="w-5 h-5"></lucide-icon>
            <span class="font-medium">Overview</span>
          </a>
          <a class="flex items-center gap-3 p-3 rounded-xl text-high-tech-gray-400 hover:bg-white/5 transition-all">
            <lucide-icon [name]="Users" class="w-5 h-5"></lucide-icon>
            <span class="font-medium">User Management</span>
          </a>
          <a class="flex items-center gap-3 p-3 rounded-xl text-high-tech-gray-400 hover:bg-white/5 transition-all">
            <lucide-icon [name]="Activity" class="w-5 h-5"></lucide-icon>
            <span class="font-medium">System Logs</span>
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
            <p class="mono-label mb-1">System Administrator</p>
            <h1 class="text-4xl font-extrabold tracking-tight">Dashboard Overview</h1>
          </div>
          <div class="flex items-center gap-4">
            <div class="relative hidden md:block">
              <lucide-icon [name]="Search" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-high-tech-gray-500"></lucide-icon>
              <input type="text" placeholder="Search analytics..." class="bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm outline-none focus:border-high-tech-accent transition-all w-64">
            </div>
            <button class="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center relative hover:bg-white/10 transition-all">
              <lucide-icon [name]="Bell" class="w-5 h-5 text-high-tech-gray-400"></lucide-icon>
              <span class="absolute top-2 right-2 w-2 h-2 bg-high-tech-accent rounded-full"></span>
            </button>
            <div class="flex items-center gap-3 pl-4 border-l border-white/10">
              <div class="text-right hidden sm:block">
                <p class="text-sm font-bold">{{ user?.name }}</p>
                <p class="text-[10px] text-high-tech-accent uppercase tracking-widest font-bold">Admin</p>
              </div>
              <div class="w-10 h-10 rounded-full bg-gradient-to-tr from-high-tech-accent to-high-tech-blue p-[1px]">
                <div class="w-full h-full rounded-full bg-high-tech-black flex items-center justify-center overflow-hidden">
                  <img src="https://picsum.photos/seed/admin/100/100" alt="Avatar" class="w-full h-full object-cover">
                </div>
              </div>
            </div>
          </div>
        </header>

        <!-- KPI Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="glass-card p-6 space-y-4">
            <div class="flex items-center justify-between">
              <div class="w-10 h-10 rounded-lg bg-high-tech-accent/10 flex items-center justify-center">
                <lucide-icon [name]="Users" class="w-5 h-5 text-high-tech-accent"></lucide-icon>
              </div>
              <span class="flex items-center gap-1 text-high-tech-accent text-xs font-bold">
                <lucide-icon [name]="ArrowUpRight" class="w-3 h-3"></lucide-icon>
                12.5%
              </span>
            </div>
            <div>
              <p class="text-high-tech-gray-400 text-xs uppercase tracking-widest font-bold">Total Users</p>
              <p class="text-3xl font-bold mt-1">24,512</p>
            </div>
          </div>

          <div class="glass-card p-6 space-y-4">
            <div class="flex items-center justify-between">
              <div class="w-10 h-10 rounded-lg bg-high-tech-blue/10 flex items-center justify-center">
                <lucide-icon [name]="DollarSign" class="w-5 h-5 text-high-tech-blue"></lucide-icon>
              </div>
              <span class="flex items-center gap-1 text-high-tech-accent text-xs font-bold">
                <lucide-icon [name]="ArrowUpRight" class="w-3 h-3"></lucide-icon>
                8.2%
              </span>
            </div>
            <div>
              <p class="text-high-tech-gray-400 text-xs uppercase tracking-widest font-bold">Total Revenue</p>
              <p class="text-3xl font-bold mt-1">$1.2M</p>
            </div>
          </div>

          <div class="glass-card p-6 space-y-4">
            <div class="flex items-center justify-between">
              <div class="w-10 h-10 rounded-lg bg-high-tech-accent/10 flex items-center justify-center">
                <lucide-icon [name]="ShoppingCart" class="w-5 h-5 text-high-tech-accent"></lucide-icon>
              </div>
              <span class="flex items-center gap-1 text-high-tech-red text-xs font-bold">
                <lucide-icon [name]="ArrowDownRight" class="w-3 h-3"></lucide-icon>
                2.4%
              </span>
            </div>
            <div>
              <p class="text-high-tech-gray-400 text-xs uppercase tracking-widest font-bold">Active Orders</p>
              <p class="text-3xl font-bold mt-1">842</p>
            </div>
          </div>

          <div class="glass-card p-6 space-y-4">
            <div class="flex items-center justify-between">
              <div class="w-10 h-10 rounded-lg bg-high-tech-blue/10 flex items-center justify-center">
                <lucide-icon [name]="Activity" class="w-5 h-5 text-high-tech-blue"></lucide-icon>
              </div>
              <span class="flex items-center gap-1 text-high-tech-accent text-xs font-bold">
                <lucide-icon [name]="ArrowUpRight" class="w-3 h-3"></lucide-icon>
                0.5%
              </span>
            </div>
            <div>
              <p class="text-high-tech-gray-400 text-xs uppercase tracking-widest font-bold">System Uptime</p>
              <p class="text-3xl font-bold mt-1">99.9%</p>
            </div>
          </div>
        </div>

        <!-- Charts Section -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div class="lg:col-span-2 glass-card p-8">
            <div class="flex items-center justify-between mb-8">
              <div>
                <h3 class="text-xl font-bold">Performance Analytics</h3>
                <p class="text-sm text-high-tech-gray-400">Real-time system throughput</p>
              </div>
              <div class="flex items-center gap-2">
                <button class="px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-high-tech-accent text-black rounded-full">Daily</button>
                <button class="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-high-tech-gray-400 hover:text-white transition-all">Weekly</button>
              </div>
            </div>
            
            <div class="h-64 w-full relative">
              <app-chart [data]="chartData" color="#00FF9D"></app-chart>
            </div>
          </div>

          <div class="glass-card p-8 flex flex-col">
            <h3 class="text-xl font-bold mb-2">User Distribution</h3>
            <p class="text-sm text-high-tech-gray-400 mb-8">By geographic region</p>
            
            <div class="flex-1 flex flex-col justify-center gap-6">
              <div class="space-y-2">
                <div class="flex justify-between text-sm">
                  <span class="font-medium">North America</span>
                  <span class="text-high-tech-accent font-bold">45%</span>
                </div>
                <div class="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div class="h-full bg-high-tech-accent w-[45%]"></div>
                </div>
              </div>
              <div class="space-y-2">
                <div class="flex justify-between text-sm">
                  <span class="font-medium">Europe</span>
                  <span class="text-high-tech-blue font-bold">30%</span>
                </div>
                <div class="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div class="h-full bg-high-tech-blue w-[30%]"></div>
                </div>
              </div>
              <div class="space-y-2">
                <div class="flex justify-between text-sm">
                  <span class="font-medium">Asia Pacific</span>
                  <span class="text-white font-bold">15%</span>
                </div>
                <div class="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div class="h-full bg-white/40 w-[15%]"></div>
                </div>
              </div>
              <div class="space-y-2">
                <div class="flex justify-between text-sm">
                  <span class="font-medium">Others</span>
                  <span class="text-high-tech-gray-400 font-bold">10%</span>
                </div>
                <div class="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div class="h-full bg-white/10 w-[10%]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Table Section -->
        <div class="glass-card overflow-hidden">
          <div class="p-8 border-b border-white/5 flex items-center justify-between">
            <div>
              <h3 class="text-xl font-bold">Recent Transactions</h3>
              <p class="text-sm text-high-tech-gray-400">Latest activity across the network</p>
            </div>
            <button class="btn-secondary text-xs py-2 px-4">View All</button>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-white/[0.02]">
                  <th class="p-4 text-[10px] font-bold uppercase tracking-widest text-high-tech-gray-400 border-b border-white/5">Transaction ID</th>
                  <th class="p-4 text-[10px] font-bold uppercase tracking-widest text-high-tech-gray-400 border-b border-white/5">Customer</th>
                  <th class="p-4 text-[10px] font-bold uppercase tracking-widest text-high-tech-gray-400 border-b border-white/5">Status</th>
                  <th class="p-4 text-[10px] font-bold uppercase tracking-widest text-high-tech-gray-400 border-b border-white/5">Amount</th>
                  <th class="p-4 text-[10px] font-bold uppercase tracking-widest text-high-tech-gray-400 border-b border-white/5">Date</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-white/5">
                @for (tx of transactions; track tx.id) {
                  <tr class="hover:bg-white/[0.01] transition-all">
                    <td class="p-4 text-sm font-mono text-high-tech-accent">{{ tx.id }}</td>
                    <td class="p-4">
                      <div class="flex items-center gap-3">
                        <div class="w-8 h-8 rounded-full bg-white/5 overflow-hidden">
                          <img [src]="'https://picsum.photos/seed/' + tx.customer + '/32/32'" alt="Avatar">
                        </div>
                        <span class="text-sm font-medium">{{ tx.customer }}</span>
                      </div>
                    </td>
                    <td class="p-4">
                      <span [class]="'px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ' + 
                        (tx.status === 'Completed' ? 'bg-high-tech-accent/10 text-high-tech-accent' : 
                         tx.status === 'Pending' ? 'bg-high-tech-blue/10 text-high-tech-blue' : 
                         'bg-high-tech-red/10 text-high-tech-red')">
                        {{ tx.status }}
                      </span>
                    </td>
                    <td class="p-4 text-sm font-bold">{{ tx.amount | currency }}</td>
                    <td class="p-4 text-sm text-high-tech-gray-400">{{ tx.date }}</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>

        <!-- Footer -->
        <footer class="pt-10 pb-6 border-t border-white/5 text-center">
          <p class="text-sm text-high-tech-gray-400">
            &copy; 2026 TECH-OS. Developed by <span class="text-high-tech-accent font-medium">Farouk Ahmed</span>
          </p>
        </footer>
      </main>
    </div>
  `,
  styles: []
})
export class AdminDashboardComponent implements OnInit {
  user: any;
  showWelcome = true;
  
  readonly LayoutDashboard = LayoutDashboard;
  readonly Users = Users;
  readonly Activity = Activity;
  readonly Settings = Settings;
  readonly LogOut = LogOut;
  readonly TrendingUp = TrendingUp;
  readonly DollarSign = DollarSign;
  readonly ShoppingCart = ShoppingCart;
  readonly ArrowUpRight = ArrowUpRight;
  readonly ArrowDownRight = ArrowDownRight;
  readonly Bell = Bell;
  readonly Search = Search;

  transactions = [
    { id: '#TX-8291', customer: 'Alex Rivera', status: 'Completed', amount: 1250.00, date: 'Mar 22, 2026' },
    { id: '#TX-8292', customer: 'Sarah Chen', status: 'Pending', amount: 450.50, date: 'Mar 21, 2026' },
    { id: '#TX-8293', customer: 'Marcus Thorne', status: 'Completed', amount: 3200.00, date: 'Mar 21, 2026' },
    { id: '#TX-8294', customer: 'Elena Vance', status: 'Failed', amount: 120.00, date: 'Mar 20, 2026' },
    { id: '#TX-8295', customer: 'Jordan Smith', status: 'Completed', amount: 890.00, date: 'Mar 20, 2026' },
  ];

  chartData = [
    { date: '2026-03-16', value: 45 },
    { date: '2026-03-17', value: 52 },
    { date: '2026-03-18', value: 48 },
    { date: '2026-03-19', value: 70 },
    { date: '2026-03-20', value: 65 },
    { date: '2026-03-21', value: 85 },
    { date: '2026-03-22', value: 78 },
  ];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.user = this.authService.currentUserValue;
  }

  logout() {
    this.authService.logout();
  }
}
