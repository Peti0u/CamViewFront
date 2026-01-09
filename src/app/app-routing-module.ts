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

const routes: Routes = [
  {
    path: '',
    component: LogIn,
  },
  {
    path: 'Home',
    component: Home,
    children: [
      { path: 'HomeDashBoard', component: Dashboard },
      { path: 'HomeCameras', component: Cameras },
    ],
  },
  {
    path: 'Files',
    component: Files,
  },
  {
    path: 'Add',
    component: Add,
  },
  {
    path: 'Notifications',
    component: Notifications,
  },
  {
    path: 'Settings',
    component: Settings,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
