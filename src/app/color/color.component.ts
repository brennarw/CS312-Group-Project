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
  selectedColor!: string;
  showColorTable: boolean = false;
  // restrictedColorOptions!: string[];
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
  usedColors = new Set<string>();
  selectedDropdownColors: string[] = []; 
  print: boolean = false;

  colors: string[] = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'grey', 'brown', 'black', 'teal'];
  previousSelections = new Map<HTMLSelectElement, string>();

  showPaintTable = false;

  formSubmit() {
    this.rowsArray = Array(this.numRows).fill(0);
    // this.columnLabels = this.generateColumnLabels(this.numCols);
    // this.createTable(false);
    this.adjustColorOptions();
    this.showColorTable = true;
    this.renderPaintTable();
  }

  printPage(): void {
    // this.createTable(true);
    this.print = true;
    setTimeout(() => window.print(), 0);
    window.onafterprint = () => {
      this.print = false;
    };
    // this.createTable(false);
  }

  // generateColumnLabels(count: number): string[] {
  //   const labels: string[] = [];
  //   for (let i = 0; i < count; i++) {
  //     let label = '';
  //     let temp = i;
  //     do {
  //       label = String.fromCharCode((temp % 26) + 65) + label;
  //       temp = Math.floor(temp / 26) - 1;
  //     } while (temp >= 0);
  //     labels.push(label);
  //   }
  //   return labels;
  // }
  // onCellClick(col: string, row: number) {
  //   alert(`${col}${row}`);
  // }

  adjustColorOptions() {
    for(let i = 0; i < this.numColors; i++) {
      this.usedColors.add(this.allColorOptions[i]);
    }
  }

  onDropdownChange(index: number): void {
    const selected = this.selectedDropdownColors[index];
    // Example: check for duplicates
    const occurrences = this.selectedDropdownColors.filter(c => c === selected).length;
    if (occurrences > 1) {
      alert(`Color "${selected}" has already been selected!`);
      this.selectedDropdownColors[index] = ''; // Clear the duplicate
    }
  }
  

  /////////////////////////////////////////////////////////////////

//   createTable(print: boolean): void {
//     if(print) {
//       const colorBoxContainer = document.getElementById('colorTable')!;
//       colorBoxContainer.innerHTML = ''; 

//       this.usedColors.forEach(color => {
//         const colorBox = document.createElement('div');
//         colorBox.textContent = color;
//         colorBox.style.padding = '5px';
//         colorBox.style.marginBottom = '5px';
//         colorBox.style.width = '50px';
//         colorBox.style.textAlign = 'center';
//         colorBox.style.fontSize = '10px';
//         colorBox.style.boxShadow = '0 0 5px rgba(0,0,0,0.2)';
//         colorBoxContainer.appendChild(colorBox);
//       });
      
//       return;
//     }
//     this.previousSelections.clear();
//     this.usedColors.clear();
//     const table = document.getElementById('colorTable')!;
//     table.innerHTML = '';

//     for (let i = 0; i < this.numColors; i++) {
//       const row = document.createElement('tr');

//       const leftColumn = document.createElement('td');
//       leftColumn.style.width = '20%';

//       const radioButton = document.createElement('input');
//       radioButton.type = 'radio';
//       radioButton.name = 'selectedColor';
//       radioButton.style.width = '25px';
//       radioButton.style.scale = '1.25';
//       radioButton.style.borderColor = '#d2adf4';
//       radioButton.onclick = () => this.unselectOtherRadioButtons(radioButton);
//       leftColumn.appendChild(radioButton);

//       const colorDropdown = document.createElement('select');
//       colorDropdown.name = `color-${i}`;
//       colorDropdown.dataset['rowIndex'] = i.toString();
//       this.colors.forEach(color => {
//         const option = document.createElement('option');
//         option.value = color;
//         option.textContent = color.charAt(0).toUpperCase() + color.slice(1);
//         colorDropdown.appendChild(option);
//       });

//       const defaultColor = this.colors[i];
//       colorDropdown.value = defaultColor;
//       this.usedColors.add(defaultColor);
//       this.previousSelections.set(colorDropdown, defaultColor);
//       colorDropdown.addEventListener('change', () => this.handleColorSelection(colorDropdown));
//       colorDropdown.style.borderColor='#422d4d';
//       colorDropdown.style.borderRadius='10px';
//       colorDropdown.style.borderWidth='2px';
//       colorDropdown.style.padding='5px';

//       leftColumn.appendChild(colorDropdown);
//       row.appendChild(leftColumn);

//       const rightColumn = document.createElement('td');
//       rightColumn.style.width = '80%';
//       row.appendChild(rightColumn);

//       table.appendChild(row);
//       table.style.padding = '15px';
//     }
//   }

//   unselectOtherRadioButtons(currentRadioButton: HTMLInputElement): void {
//     console.log(currentRadioButton);
//     const radios = document.querySelectorAll('input[type="radio"]');
//     radios.forEach(radio => {
//       if (radio !== currentRadioButton) {
//         (radio as HTMLInputElement).checked = false;
//       }
//     });
//   }

//   handleColorSelection(changedDropdown: HTMLSelectElement): void {
//     const selectedColor = changedDropdown.value;
//     const allDropdowns = document.querySelectorAll('select');
//     for (const dropdown of allDropdowns) {
//       if (dropdown !== changedDropdown && (dropdown as HTMLSelectElement).value === selectedColor) {
//         const previous = this.previousSelections.get(changedDropdown);
//         changedDropdown.value = previous!;
//         alert(`Color "${selectedColor}" is already selected. Please choose a different color.`);
//         return;
//       }
//     }

//     this.previousSelections.set(changedDropdown, selectedColor);
//     this.usedColors.clear();
//     for (const [key, value] of this.previousSelections) {
//       this.usedColors.add(value);
//     }
//     // this.usedColors.set(selectedColor);
//     // console.log(this.previousSelections);
//     // console.log(this.usedColors);
//   }

  renderPaintTable(): void {
    this.showPaintTable = true;
  }


}
