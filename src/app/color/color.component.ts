import { Component} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PaintTableComponent } from './paint-table/paint-table.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

interface Color {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-color',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, PaintTableComponent, MatRadioModule, MatFormFieldModule, MatInputModule, MatSelectModule], 
  templateUrl: './color.component.html',
  styleUrl: './color.component.css',
})

export class ColorComponent {
  numRows!: number;
  numCols!: number; 
  numColors!: number;
  rowsArray!: number[];
  columnLabels!: string[];
  showColorTable: boolean = false;
  allColorOptions: string[] = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'grey', 'brown', 'black', 'teal'];
  colorSelection: Color[] = [
    {value: 'red', viewValue: 'Red'},
    {value: 'orange', viewValue: 'Orange'},
    {value: 'yellow', viewValue: 'Yellow'},
    {value: 'green', viewValue: 'Green'},
    {value: 'blue', viewValue: 'Blue'},
    {value: 'purple', viewValue: 'Purple'},
    {value: 'grey', viewValue: 'Grey'},
    {value: 'brown', viewValue: 'Brown'},
    {value: 'black', viewValue: 'Black'},
    {value: 'teal', viewValue: 'Teal'},
  ];
  // usedColors = new Set<string>();
  filledCells: { [key: string]: string } = {};
  radioRows: {color:string, coloredCells: string[]}[] = [];
  selectedColor: string = '';
  selectedRadioIndex: number = -1;
  print: boolean = false;

  colors: string[] = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'grey', 'brown', 'black', 'teal'];
  previousSelections = new Map<HTMLSelectElement, string>();

  showPaintTable = false;

  formSubmit() {
    this.adjustColorOptions();
    this.showColorTable = true;
    this.renderPaintTable();
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
