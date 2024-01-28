import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewDocumentModule } from './new-document/new-document.module';
import { WelcomePageComponent } from './welcome-page.component';
import { HomeComponent } from './home/home.component';
import { FeaturesComponent } from './features/features.component';

@NgModule({
  declarations: [WelcomePageComponent, HomeComponent, FeaturesComponent],
  imports: [CommonModule, NewDocumentModule],
})
export class WelcomePageModule {}
