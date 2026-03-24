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
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, ReactiveFormsModule, Home],
  providers: [authInterceptorProviders],
  bootstrap: [App],
})
export class AppModule {}
