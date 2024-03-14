import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiService } from '../core/services/api.service';

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
  constructor(private api: ApiService) {}
  ngAfterViewInit(): void {
    this.emailElem?.nativeElement.focus();
    this.emailElem?.nativeElement.addEventListener('keydown', (e: any) => {
      if (e.code == 'Enter') {
        this.messageElem?.nativeElement.focus();
      }
    });

    this.messageElem?.nativeElement.addEventListener('keydown', (e: any) => {
      if (e.code == 'Enter') {
        this.sendEmail();
      }
    });
  }
  sendEmail() {
    this.loading = true;
    console.log(this.emailControl.value);
    console.log(this.emailControl.valid);
    console.log(this.messageControl.value);
  }
}
