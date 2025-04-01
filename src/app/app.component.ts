import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AboutPageComponent } from './about-page/about-page.component';
import { ProfileCardComponent } from './about-page/profile-card/profile-card.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AboutPageComponent, ProfileCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

// @Component({
//   selector: 'app-about-page',
//   imports: [AboutPageComponent],
//   templateUrl: './app/about-page/about-page.component.html',
//   styleUrl: './app/about-page/about-page.component.css'
// })

export class AppComponent {
  title = 'cs312-group-project';
}
