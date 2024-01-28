import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GetStartedComponent } from './get-started.component';
import { AuthComponent } from './auth/auth.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [GetStartedComponent, AuthComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'get-started',
        component: GetStartedComponent,
      },
      {
        path: 'auth',
        component: AuthComponent,
      },
    ]),
    ReactiveFormsModule,
  ],
  exports: [],
})
export class GetStartedModule {}
