import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GetStartedComponent } from './get-started.component';
import { AuthComponent } from './auth/auth.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppModule } from '../app.module';
import { NavBarModule } from '../nav-bar/nav-bar.module';

@NgModule({
  declarations: [GetStartedComponent, AuthComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        title: 'Get started with Photoforge - Photoforge',
        component: GetStartedComponent,
        // data: { animation: 'GetStartedPage' },
      },
      {
        path: 'auth',
        title: 'Authentication - Photoforge',
        component: AuthComponent,
        data: { animation: 'AuthPage' },
      },
    ]),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NavBarModule,
  ],
  exports: [],
})
export class GetStartedModule {}
