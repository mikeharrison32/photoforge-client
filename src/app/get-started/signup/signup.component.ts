import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  email: string = '';
  password: string = '';
  confirm_password: string = '';
  loading: boolean = false;
  constructor(private authService: AuthService, private router: Router) {}
  singUp() {
    //TODO:check email validation and password confirmation
    this.authService.signUp(this.email, this.password).subscribe({
      next: (value) => {
        this.router.navigateByUrl('/login');
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
      },
    });
  }
}
