import { Component } from '@angular/core';
import { ProfileCardComponent } from './profile-card/profile-card.component';

@Component({
  selector: 'app-about-page',
  imports: [ProfileCardComponent],
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.css'
})
export class AboutPageComponent {

}
