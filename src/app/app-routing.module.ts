import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './AuthGuard';
import { JuryDashboardComponent } from './pages/jury-dashboard/jury-dashboard.component';
import { MemberDashboardComponent } from './pages/member-dashboard/member-dashboard.component';

const routes: Routes = [
  { 
    path: '',
    component: HomeComponent
  },
  { 
    path: 'login', 
    component: LoginComponent
  },
  {
    path: 'AdminDashboard', 
    component: AdminDashboardComponent,
    canActivate: [AuthGuard],
    data: { role: 'admin' },
  },
  {
    path: 'JuryDashboard', 
    component: JuryDashboardComponent,
    canActivate: [AuthGuard],
    data: { role: 'jury' },
  },
  {
    path: 'MemberDashboard', 
    component: MemberDashboardComponent,
    canActivate: [AuthGuard],
    data: { role: 'member' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }