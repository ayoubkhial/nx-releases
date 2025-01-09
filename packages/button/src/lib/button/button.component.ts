import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-button',
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  title = 'hello !';

  ngOnInit() {
    console.log('Button works!!2423232');
    console.log('title', this.title);
  }
}
