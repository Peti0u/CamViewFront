import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { SignUpComponent } from './components/sign-up/sign-up';
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
    SignUpComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ChevronLeftIconComponent,
    ChevronRightIconComponent,
    CircleIconComponent,
    CircleDotIconComponent,
  ],
  providers: [authInterceptorProviders],
  bootstrap: [App],
})
export class AppModule {}
