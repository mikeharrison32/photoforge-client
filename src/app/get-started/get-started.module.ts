import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GetStartedComponent } from './get-started.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppModule } from '../app.module';
import { NavBarModule } from '../nav-bar/nav-bar.module';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
@NgModule({
  declarations: [GetStartedComponent, SignupComponent, LoginComponent],
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
        path: 'signup',
        title: 'SignUp - Photoforge',
        component: SignupComponent,
        data: { animation: 'AuthPage' },
      },
      {
        path: 'login',
        title: 'Login - Photoforge',
        component: LoginComponent,
        data: { animation: 'AuthPage' },
      },
    ]),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NavBarModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
  ],
  exports: [],
})
export class GetStartedModule {}
