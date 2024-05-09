import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { authIconAnimation } from 'src/app/animations';
import { DataService } from 'src/app/core/services/data.service';
import { NotificationService } from 'src/app/core/services/notification.service';
enum AuthStatus {
  SignUp,
  Login,
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  animations: [authIconAnimation],
})
export class AuthComponent implements OnInit, AfterViewInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private data: DataService,
    private notification: NotificationService
  ) {}

  userNameControl = new FormControl('');
  passwordControl = new FormControl('');
  confirmPasswordControl = new FormControl('');
  isLoading: boolean = false;
  authStatus: AuthStatus = AuthStatus.SignUp;
  @ViewChild('username') usernameElem?: ElementRef;
  @ViewChild('password') passwordElem?: ElementRef;
  @ViewChild('confirmPassword') confirmPasswordElem?: ElementRef;

  get AuthStatus() {
    return AuthStatus;
  }

  ngOnInit(): void {
    document.title = 'Autentication - Photoforge';
  }
  ngAfterViewInit(): void {
    this.usernameElem?.nativeElement.focus();
    (this.usernameElem?.nativeElement as HTMLElement).addEventListener(
      'keydown',
      (e) => {
        if (e.code == 'Enter') {
          this.passwordElem?.nativeElement.focus();
          this.usernameElem!.nativeElement.style.borderBottom =
            'solid 1px #6f6f6f';
        }
      }
    );
    (this.passwordElem?.nativeElement as HTMLElement).addEventListener(
      'keydown',
      (e) => {
        if (e.code == 'Enter') {
          this.confirmPasswordElem?.nativeElement.focus();
        }
      }
    );
    (this.confirmPasswordElem?.nativeElement as HTMLElement).addEventListener(
      'keydown',
      (e) => {
        if (e.code == 'Enter') {
          this.signUp();
        }
      }
    );
  }
  signUp() {
    if (this.userNameControl.value?.trim() == '') {
      this.usernameElem!.nativeElement.style.borderBottom = 'solid 1px #ff4626';
      this.usernameElem?.nativeElement.focus();
      return;
    }
    if (this.passwordControl.value?.trim() == '') {
      this.passwordElem!.nativeElement.style.borderBottom = 'solid 1px #ff4626';
      return;
    }

    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.notification.createNotification({
        title: 'The server is temporarly down, try again later.',
      });
    }, 5000);
    this.authService.signup(
      this.userNameControl.value,
      this.passwordControl.value
    );
    this.authService.login(
      this.userNameControl.value,
      this.passwordControl.value
    );
  }
  login() {
    if (this.userNameControl.value?.trim() == '') {
      this.usernameElem!.nativeElement.style.border = 'solid 1px red';
      return;
    }
    if (this.passwordControl.value?.trim() == '') {
      this.passwordElem!.nativeElement.style.border = 'solid 1px red';
      return;
    }
    this.authService.login(
      this.userNameControl.value,
      this.passwordControl.value
    );
  }
  cancel() {}
}
