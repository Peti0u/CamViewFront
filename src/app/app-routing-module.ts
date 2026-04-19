import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

import { LogIn } from './components/log-in/log-in';
import { SignUpComponent } from './components/sign-up/sign-up';
import { Home } from './components/home/home';
import { Files } from './components/files/files';
import { Add } from './components/add/add';
import { Notifications } from './components/notifications/notifications';
import { Settings } from './components/settings/settings';
import { Dashboard } from './components/home/dashboard/dashboard';
import { Cameras } from './components/home/cameras/cameras';
import { FullCamera } from './components/full-camera/full-camera';

const routes: Routes = [
  // Routes publiques
  {
    path: 'login',
    component: LogIn,
  },
  {
    path: 'signup',
    component: SignUpComponent,
  },

  // Routes protégées
  {
    path: '',
    component: Home,
    canActivate: [AuthGuard], // Protège le layout principal et ses enfants
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // Redirection par défaut
      { path: 'dashboard', component: Dashboard },
      { path: 'cameras', component: Cameras },
    ],
  },
  {
    path: 'files',
    component: Files,
    canActivate: [AuthGuard],
  },
  {
    path: 'add',
    component: Add,
    canActivate: [AuthGuard],
  },
  {
    path: 'notifications',
    component: Notifications,
    canActivate: [AuthGuard],
  },
  { path: 'camera', component: FullCamera, canActivate: [AuthGuard] },
  {
    path: 'settings',
    component: Settings,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
