import { NgModule, Renderer2 } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';
import { HelpPageComponent } from './help-page/help-page.component';
import { PricingComponent } from './pricing/pricing.component';
import { ContactComponent } from './contact/contact.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { InfoDirective } from './shared/directives/info.directive';
import { LoadingPageComponent } from './loading-page/loading-page.component';

const routes: Routes = [
  {
    path: 'start',
    component: WelcomePageComponent,
    title: 'Setup - Photoforge',
    // canActivate: [authGuard],
  },
  {
    path: 'editor/:projectId',
    component: EditorComponent,
    title: 'Editor - Photoforge',
    data: { animation: 'EditorPage' },

    // canActivate: [authGuard],
  },
  {
    path: 'help',
    component: HelpPageComponent,
    title: 'Help - Photoforge',
  },
  {
    path: 'contact',
    component: ContactComponent,
    title: 'Contact - Photoforge',
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent,
    title: 'Privacy Policy - Photoforge',
  },
  {
    path: 'terms-of-service',
    component: TermsOfServiceComponent,
    title: 'Terms of Sercvice',
  },
];
@NgModule({
  declarations: [
    AppComponent,
    PrivacyPolicyComponent,
    TermsOfServiceComponent,
    HelpPageComponent,
    PricingComponent,
    ContactComponent,
    NavBarComponent,
    LoadingPageComponent,
  ],
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
    ReactiveFormsModule,
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
