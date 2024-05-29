import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  loading: boolean = false;
  constructor(private authService: AuthService, private router: Router) {}

  logIn() {
    this.authService.logIn(this.email, this.password).subscribe({
      next: (res) => {
        localStorage.setItem('access_token', (res as any).accessToken);
        localStorage.setItem('refresh_token', (res as any).refreshToken);
        this.router.navigateByUrl('/start');
      },
      error: (err) => console.log(err),
    });
  }
}
