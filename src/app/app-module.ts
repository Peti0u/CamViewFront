import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Home } from './home/home';
import { Files } from './files/files';
import { Add } from './add/add';
import { Notifications } from './notifications/notifications';
import { Settings } from './settings/settings';
import { LogIn } from './log-in/log-in';

@NgModule({
  declarations: [
    App,
    Home,
    Files,
    Add,
    Notifications,
    Settings,
    LogIn
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
  ],
  bootstrap: [App]
})
export class AppModule { }
