import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { firstValueFrom } from 'rxjs';


interface Color {
  name: string;
}

@Component({
  selector: 'app-color-selection',
  imports: [FormsModule, CommonModule],
  templateUrl: './color-selection.component.html',
  styleUrl: './color-selection.component.css'
})

@Injectable({
  providedIn: 'root'
})

export class ColorSelectionComponent{
  numCurrentColors!: number;
  color!: string;
  hex!: string;
  error: boolean = false;
  success: boolean = false;

  editColor!: string;  
  newColor!: string;   
  newHex!: string;
  editSuccess: boolean = false;
  editError: boolean = false;

  deleteColor!: string;
  deleteSuccess: boolean = false;
  deleteError: boolean = false;
  deleteErrorMsg: string = '';

  add_color_url = 'https://cs.colostate.edu/~etaketa/addColor.php';
  edit_color_url = 'https://cs.colostate.edu/~etaketa/editColor.php';
  delete_color_url = 'https://cs.colostate.edu/~c837347176/deleteColor.php';

  constructor(private http: HttpClient) {}

  async ngOnInit() {
    const numCurrentColors = this.getColors();
    this.numCurrentColors = await numCurrentColors;
  }

  async getColors(): Promise<number> {
    try {
      const data = await firstValueFrom(this.http.get<Color[]>('https://cs.colostate.edu/~etaketa/getColors.php'));
      return data.length;
    } catch (error) {
      console.error("There was an error fetching the number of colors", error);
      return 0;
    }
  }

  blockSpaces(event: KeyboardEvent) {
    if (event.key === ' ') {
      event.preventDefault();
    }
  }

  AddColor() {
    console.log(`request made with color: ${this.color} and ${this.hex}`);
    const options = {headers:{'Content-Type':'application/json'}};
    let out: AddColor = new AddColor(this.color, this.hex);
    this.http.post<any>(this.add_color_url, JSON.stringify(out), options).subscribe({
      next: data => {
        this.success = true;
        console.log('Entry was successfully added');
      },
      error: err => {
        this.error = true;
        console.log(`There was an error`, err);
      }
    })
    this.success = false;
    this.error = false;
  }
  
  EditColor() {
    if (!this.newColor && !this.newHex) {
      this.editError = true;
      console.log('Nothing to update!');
      return;
    }
    this.editSuccess = false;
    this.editError = false;
  
    console.log(`Editing color: ${this.editColor} → name: ${this.newColor}, hex: ${this.newHex}`);
    const options = { headers: { 'Content-Type': 'application/json' } };
    let out = new EditColor(this.editColor, this.newColor, this.newHex);
    this.http.put<any>(this.edit_color_url, JSON.stringify(out), options).subscribe({
      next: data => {
        this.editSuccess = true;
        console.log('Color successfully updated');
      },
      error: err => {
        this.editError = true;
        console.log('Edit failed', err);
      }
    });
  }  

  DeleteColor(deleteForm: NgForm) {
    const confirmed = window.confirm(`Are you sure you want to delete the color: "${this.deleteColor}"?`);
    if (!confirmed) return;

    const headers = {'Content-Type':'application/json'};
    const body = {color: this.deleteColor};
    
    this.http.post<any>(this.delete_color_url, body, {headers}).subscribe({
      next: data => {
        if (data && data.error){
          this.deleteError = true;
          this.deleteErrorMsg = data.error.error;
          console.error(`There was an error deleting ${this.deleteColor}: `, data.error.error);
        }
        else {
          this.deleteSuccess = true;
          console.log(`${this.deleteColor} was successfully deleted`);
          deleteForm.resetForm()
        }
      },
      error: err => {
        this.deleteError = true;
        this.deleteErrorMsg = err.error.error;
        console.error(`There was an error deleting ${this.deleteColor}: `, err.error.error);
      }
    })
    this.deleteError = false;
    this.deleteSuccess = false;
  }
}


export class AddColor {
  color: string;
  hex: string;
  constructor(color: string, hex: string) {
    this.color = color;
    this.hex = hex;
  }
}

export class EditColor {
  currentColor: string;
  newColor: string | null;
  newHex: string | null;
  constructor(currentColor: string, newColor?: string, newHex?: string) {
    this.currentColor = currentColor;
    this.newColor = newColor || null;
    this.newHex = newHex || null;
  }
}