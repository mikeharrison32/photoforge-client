import {
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
export class AuthComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private data: DataService
  ) {}
  userNameControl = new FormControl('');
  passwordControl = new FormControl('');
  confirmPasswordControl = new FormControl('');
  isLoading: boolean = false;
  authStatus: AuthStatus = AuthStatus.SignUp;
  @ViewChild('username') usernameElem?: ElementRef;
  @ViewChild('password') passwordElem?: ElementRef;

  get AuthStatus() {
    return AuthStatus;
  }

  ngOnInit(): void {
    document.title = 'Autentication - Photoforge';
    this.data.showNav.next(false);
  }
  signUp() {
    const err = document.createElement('span');
    err.classList.add('err');
    if (this.userNameControl.value?.trim() == '') {
      this.usernameElem!.nativeElement.style.border = 'solid 1px #ff4626';
      err.textContent = 'Please fill in your Username.';
      this.usernameElem?.nativeElement.parentElement.appendChild(err);
      return;
    }
    if (this.passwordControl.value?.trim() == '') {
      this.usernameElem?.nativeElement.parentElement
        ?.querySelector('.err')
        ?.remove();
      this.passwordElem!.nativeElement.style.border = 'solid 1px #ff4626';
      err.textContent = 'Please fill in your Password.';
      this.usernameElem!.nativeElement.style.border = 'none';

      this.usernameElem?.nativeElement.parentElement.appendChild(err);
      return;
    }
    //clear the errors and red borders
    this.usernameElem?.nativeElement.parentElement
      ?.querySelector('.err')
      ?.remove();
    this.passwordElem!.nativeElement.style.border = 'none';

    this.isLoading = true;
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
