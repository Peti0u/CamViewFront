import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing-module';
import { authInterceptorProviders } from './auth/auth.interceptor';

import { App } from './app';
import { Home } from './components/home/home';
import { Files } from './components/files/files';
import { Add } from './components/add/add';
import { Notifications } from './components/notifications/notifications';
import { Settings } from './components/settings/settings';
import { LogIn } from './components/log-in/log-in';
import { Dashboard } from './components/home/dashboard/dashboard';
import { Cameras } from './components/home/cameras/cameras';
import { Navigation } from './components/navigation/navigation';
import { SignInComponent } from './components/sign-in/sign-in';
import { ChevronLeftIconComponent } from './icons/chevron-left-icon-component/chevron-left-icon-component';
import { ChevronRightIconComponent } from './icons/chevron-right-icon-component/chevron-right-icon-component';
import { CircleIconComponent } from './icons/circle-icon-component/circle-icon-component';
import { CircleDotIconComponent } from './icons/circle-dot-icon-component/circle-dot-icon-component';

@NgModule({
  declarations: [
    App,
    Files,
    Add,
    Notifications,
    Settings,
    Dashboard,
    Cameras,
    Navigation,
    LogIn,
    SignInComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ChevronLeftIconComponent,
    ChevronRightIconComponent,
    CircleIconComponent,
    CircleDotIconComponent,
  ],
  providers: [authInterceptorProviders],
  bootstrap: [App],
})
export class AppModule {}
