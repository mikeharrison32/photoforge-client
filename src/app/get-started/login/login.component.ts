import { Component, HostListener } from '@angular/core';
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

  @HostListener('document:keydown', ['$event'])
  onEnterClick(e: KeyboardEvent) {
    if (e.code == 'Enter') {
      this.logIn();
    }
  }
  logIn() {
    this.loading = true;
    this.authService.logIn(this.email, this.password).subscribe({
      next: (res) => {
        localStorage.setItem('access_token', (res as any).accessToken);
        localStorage.setItem('refresh_token', (res as any).refreshToken);
        this.loading = false;
        this.router.navigateByUrl('/start');
      },
      error: (err) => {
        console.log(err), (this.loading = false);
      },
    });
  }
}
