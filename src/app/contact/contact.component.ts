import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiService } from '../core/services/api.service';
import { HttpClient } from '@angular/common/http';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements AfterViewInit {
  emailControl = new FormControl('');
  messageControl = new FormControl('');
  @ViewChild('email') emailElem?: ElementRef;
  @ViewChild('message') messageElem?: ElementRef;
  loading: boolean = false;
  emailSent: boolean = false;
  emailFailedToSend: boolean = false;
  constructor(private api: ApiService, private http: HttpClient) {}
  ngAfterViewInit(): void {
    this.emailElem?.nativeElement.focus();
    this.emailElem?.nativeElement.addEventListener('keydown', (e: any) => {
      if (e.code == 'Enter') {
        this.messageElem?.nativeElement.focus();
      }
    });

    this.messageElem?.nativeElement.addEventListener('keydown', (e: any) => {
      if (e.code == 'Enter') {
      }
    });
  }
  sendEmail(e: any) {
    console.log(e);
    this.loading = true;
    emailjs
      .sendForm('service_7c6ecyr', 'template_4clhhz1', e.target, {
        publicKey: 'vDNGVoYBhMOKeYyWR',
      })
      .then((res) => {
        this.loading = false;
        this.emailSent = true;
      })
      .catch((err) => {
        this.loading = false;
        this.emailFailedToSend = true;
        console.log('FAILD TO SEND EMAIL: ', err);
      });
  }
}
