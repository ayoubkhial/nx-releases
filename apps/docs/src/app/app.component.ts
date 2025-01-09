import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { ButtonComponent } from '@org-ayb/button';
import { TooltipComponent } from '@org-ayb/tooltip';

@Component({
  imports: [
    NxWelcomeComponent,
    RouterModule,
    ButtonComponent,
    TooltipComponent,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'docs!!!';
}
