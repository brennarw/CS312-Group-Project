import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-color-selection',
  imports: [FormsModule],
  templateUrl: './color-selection.component.html',
  styleUrl: './color-selection.component.css'
})
export class ColorSelectionComponent {
  color!: string;
  hex!: string;
  PostRequest() {
    console.log(`request made with color: ${this.color} and ${this.hex}`);
  }
}
