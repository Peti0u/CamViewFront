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
import { LogOutIconComponent } from './icons/log-out-icon/log-out-icon';
import { FullCamera } from './components/full-camera/full-camera';
import { ArrowLeftIconComponent } from './icons/arrow-left-icon/arrow-left-icon';
import { VideoIconComponent } from './icons/video-icon/video-icon';
import { ImageIconComponent } from './icons/image-icon/image-icon';
import { PowerIconComponent } from './icons/power-icon/power-icon';
import { BellIconComponent } from './icons/bell-icon/bell-icon';
import { SettingsIconComponent } from './icons/settings-icon/settings-icon';
import { CircleSelectedIconComponent } from './icons/circle-selected-icon/circle-selected-icon';
import { HouseIconComponent } from './icons/home-icon/home-icon';
import { FolderIconComponent } from './icons/folder-icon/folder-icon';
import { PlusIconComponent } from './icons/plus-icon/plus-icon';

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
    Cameras,
    FullCamera,
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
    CircleSelectedIconComponent,
    LogOutIconComponent,
    ArrowLeftIconComponent,
    PowerIconComponent,
    ImageIconComponent,
    VideoIconComponent,
    BellIconComponent,
    SettingsIconComponent,
    HouseIconComponent,
    FolderIconComponent,
    PlusIconComponent,
  ],
  providers: [authInterceptorProviders],
  bootstrap: [App],
})
export class AppModule {}
