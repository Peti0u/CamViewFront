import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogIn } from './log-in/log-in';
import { Home } from './home/home';
import { Files } from './files/files';
import { Add } from './add/add';
import { Notifications } from './notifications/notifications';
import { Settings } from './settings/settings';
import { Dashboard } from './home/dashboard/dashboard';
import { Cameras } from './home/cameras/cameras';
import { SignIn } from './sign-in/sign-in';

const routes: Routes = [
  // {
  //   path: '',
  //   component: LogIn,
  // },
  {
    path: '',
    component: Home,
    children: [
      { path: 'home', component: Dashboard },
      { path: 'dashboard', component: Dashboard },
      { path: 'cameras', component: Cameras },
    ],
  },
  {
    path: 'files',
    component: Files,
  },
  {
    path: 'add',
    component: Add,
  },
  {
    path: 'notifications',
    component: Notifications,
  },
  {
    path: 'settings',
    component: Settings,
  },
  {
    path: 'login',
    component: LogIn,
  },
  {
    path: 'signin',
    component: SignIn,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
