import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Sun, Moon } from 'lucide-angular';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <button 
      (click)="themeService.toggleTheme()" 
      class="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center"
      [title]="themeService.isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
    >
      @if (themeService.isDark) {
        <lucide-icon [name]="Sun" class="w-5 h-5 text-high-tech-accent"></lucide-icon>
      } @else {
        <lucide-icon [name]="Moon" class="w-5 h-5 text-high-tech-blue"></lucide-icon>
      }
    </button>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class ThemeToggleComponent {
  themeService = inject(ThemeService);
  readonly Sun = Sun;
  readonly Moon = Moon;
}
