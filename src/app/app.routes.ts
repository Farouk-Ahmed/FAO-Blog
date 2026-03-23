import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AdminDashboardComponent } from './pages/dashboards/admin/admin.component';
import { UserDashboardComponent } from './pages/dashboards/user/user.component';
import { ManagerDashboardComponent } from './pages/dashboards/manager/manager.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { 
    path: 'dashboard/admin', 
    component: AdminDashboardComponent, 
    canActivate: [authGuard],
    data: { role: 'Admin' }
  },
  { 
    path: 'dashboard/user', 
    component: UserDashboardComponent, 
    canActivate: [authGuard],
    data: { role: 'User' }
  },
  { 
    path: 'dashboard/manager', 
    component: ManagerDashboardComponent, 
    canActivate: [authGuard],
    data: { role: 'Manager' }
  },
  { path: '**', redirectTo: '/login' }
];
