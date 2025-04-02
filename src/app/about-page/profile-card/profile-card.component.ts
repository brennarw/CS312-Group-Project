import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-profile-card',
  imports: [MatButtonModule, MatCardModule],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.css'
})
export class ProfileCardComponent {
  @Input() name: string = 'No name'; 
  @Input() description: string = 'No description'; 
  @Input() picturePath: string = 'No photo'; 


}
