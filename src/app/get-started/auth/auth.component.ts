import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
enum AuthStatus {
  SignUp,
  Login,
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  constructor(private router: Router, private authService: AuthService) {}
  userNameControl = new FormControl('');
  passwordControl = new FormControl('');
  confirmPasswordControl = new FormControl('');
  authStatus: AuthStatus = AuthStatus.SignUp;
  @ViewChild("username") usernameElem?: ElementRef
  @ViewChild("password") passwordElem?: ElementRef

  get AuthStatus() {
    return AuthStatus;
  }
  signUp() {
    if(this.userNameControl.value?.trim() == ""){
      this.usernameElem!.nativeElement.style.border = "solid 1px red"
      return
    }
    if(this.passwordControl.value?.trim() == ""){
      this.passwordElem!.nativeElement.style.border = "solid 1px red"
      return
    }

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
    if(this.userNameControl.value?.trim() == ""){
      this.usernameElem!.nativeElement.style.border = "solid 1px red"
      return
    }
    if(this.passwordControl.value?.trim() == ""){
      this.passwordElem!.nativeElement.style.border = "solid 1px red"
      return
    }
    this.authService.login(
      this.userNameControl.value,
      this.passwordControl.value
    );
  }
  cancel() {}
}
