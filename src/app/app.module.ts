import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { EditorComponent } from './editor/editor.component';
import { SharedModule } from './shared/shared.module';
import { GetStartedModule } from './get-started/get-started.module';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { authGuard } from './shared/guards/auth.guard';
import { AuthService } from './core/services/auth.service';
import { TokenService } from './core/services/token.service';
import { DataService } from './core/services/data.service';
import { EditorModule } from './editor/editor.module';
import { ColorPickerModule } from 'ngx-color-picker';
import { WelcomePageModule } from './welcome-page/welcome-page.module';
import { NotificationModule } from './notification/notification.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes: Routes = [
  {
    path: 'start',
    component: WelcomePageComponent,
    // canActivate: [authGuard],
  },
  {
    path: 'editor',
    component: EditorComponent,
    // canActivate: [authGuard],
  },
];
@NgModule({
  declarations: [AppComponent],
  imports: [
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('access_token'),
        allowedDomains: ['http://localhost:5072'],
        headerName: 'Authorization',
        authScheme: 'Bearer',
        skipWhenExpired: true,
      },
    }),
    RouterModule.forRoot(routes),
    BrowserModule,
    BrowserAnimationsModule,
    EditorModule,
    SharedModule,
    CommonModule,
    GetStartedModule,
    FormsModule,
    ColorPickerModule,
    WelcomePageModule,
    NotificationModule,
  ],
  providers: [AuthService, JwtHelperService, TokenService, DataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
