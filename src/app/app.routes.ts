import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ColorComponent } from './color/color.component';

export const routes: Routes = [
    {path:'', component: HomeComponent},
    {path:'color', component: ColorComponent}
];
