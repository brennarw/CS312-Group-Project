import { Component} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PaintTableComponent } from './paint-table/paint-table.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Color {
  name: string;
}

@Component({
  selector: 'app-color',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, PaintTableComponent, MatRadioModule, MatFormFieldModule, MatInputModule, MatSelectModule], 
  templateUrl: './color.component.html',
  styleUrl: './color.component.css',
})

@Injectable({
  providedIn: 'root'
})

export class ColorComponent {
  numRows!: number;
  numCols!: number; 
  numColors!: number;
  showColorTable: boolean = false;
  allColorOptions!: string[];
  filledCells: { [key: string]: string } = {};
  radioRows: {color:string, coloredCells: string[]}[] = [];
  selectedColor: string = '';
  selectedRadioIndex: number = -1;
  print: boolean = false;

  previousSelections = new Map<HTMLSelectElement, string>();

  showPaintTable = false;

  constructor(private http: HttpClient) {
    this.allColorOptions = this.getColors();
    console.log(this.allColorOptions);
  }

  formSubmit() {
    this.adjustColorOptions();
    this.showColorTable = true;
    this.renderPaintTable();
  }

  getColors():string[] {
    let colors: Color[] = [];
    this.http.get<any>('https://cs.colostate.edu/~etaketa/getColors.php').subscribe({
      next: data => {
        console.log('Get was successful', data);
        colors = data;
      },
      error: err => {
        console.log(`There was an error`, err);
      }
    })
    return colors.map((color)=>color.name);
  }

  printPage(): void {
    this.print = true;
    setTimeout(() => window.print(), 0);
    window.onafterprint = () => {
      this.print = false;
    };
  }

  adjustColorOptions() {
    this.radioRows = [];
    this.selectedColor = '';
    this.filledCells = {};
    this.radioRows = this.allColorOptions.slice(0, this.numColors).map(color => ({ color: color, coloredCells: [] }));
  }

  isColorUsed(color: string): boolean {
    return this.radioRows.some(row => row.color === color);
  }

  onDropdownChange(index: number, newColor: string): void {
    if (!this.isColorUsed(newColor)) { //if the color switch is allowed
      this.radioRows[index].color = newColor;
      this.radioRows[index].coloredCells.forEach((cell) => {
        this.filledCells[cell] = newColor;
      })
    } 
    if (this.selectedRadioIndex === index) {
      this.selectedColor = this.radioRows[index].color;
    }
  }

  renderPaintTable(): void {
    this.showPaintTable = true;
  }


}
