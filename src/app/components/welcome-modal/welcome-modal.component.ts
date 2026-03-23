import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { LucideAngularModule, X, Shield, User, Briefcase, Sparkles } from 'lucide-angular';

@Component({
  selector: 'app-welcome-modal',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div class="w-full max-w-lg glass-card p-10 relative overflow-hidden">
        <!-- Decorative Background -->
        <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-high-tech-accent via-high-tech-blue to-purple-500"></div>
        <div class="absolute -top-20 -right-20 w-40 h-40 bg-high-tech-accent/10 rounded-full blur-3xl"></div>
        
        <button (click)="onClose()" class="absolute top-4 right-4 text-high-tech-gray-400 hover:text-white transition-all">
          <lucide-icon [name]="X" class="w-5 h-5"></lucide-icon>
        </button>

        <div class="text-center space-y-6">
          <div class="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white/5 border border-white/10 mb-2 relative">
            <lucide-icon [name]="getRoleIcon()" class="w-10 h-10" [class]="getRoleColor()"></lucide-icon>
            <div class="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-high-tech-accent flex items-center justify-center border-4 border-high-tech-black">
              <lucide-icon [name]="Sparkles" class="w-4 h-4 text-black"></lucide-icon>
            </div>
          </div>

          <div>
            <h2 class="text-3xl font-extrabold tracking-tight mb-2">Welcome, {{ user?.name }}</h2>
            <p class="text-high-tech-gray-400 text-sm max-w-xs mx-auto">You have been granted access to the <span [class]="'font-bold ' + getRoleColor()">{{ user?.role }}</span> control panel.</p>
          </div>

          <div class="grid grid-cols-1 gap-4 pt-4">
            <div class="p-4 rounded-xl bg-white/5 border border-white/10 text-left flex items-start gap-4">
              <div class="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                <lucide-icon [name]="Shield" class="w-4 h-4 text-high-tech-accent"></lucide-icon>
              </div>
              <div>
                <p class="text-xs font-bold uppercase tracking-widest mb-1">Secure Access</p>
                <p class="text-xs text-high-tech-gray-400">Your session is encrypted and monitored for security.</p>
              </div>
            </div>
          </div>

          <button (click)="onClose()" class="w-full btn-primary mt-4">
            Enter Dashboard
          </button>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class WelcomeModalComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  user: any;

  readonly X = X;
  readonly Shield = Shield;
  readonly User = User;
  readonly Briefcase = Briefcase;
  readonly Sparkles = Sparkles;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.user = this.authService.currentUserValue;
  }

  onClose() {
    this.close.emit();
  }

  getRoleIcon() {
    switch (this.user?.role) {
      case 'Admin': return Shield;
      case 'Manager': return Briefcase;
      default: return User;
    }
  }

  getRoleColor() {
    switch (this.user?.role) {
      case 'Admin': return 'text-high-tech-accent';
      case 'Manager': return 'text-purple-500';
      default: return 'text-high-tech-blue';
    }
  }
}
