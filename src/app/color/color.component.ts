import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-color',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule], 
  templateUrl: './color.component.html',
  styleUrl: './color.component.css'
})
export class ColorComponent {
  numRows!: number;
  numCols!: number; 
  numColors!: number;
  rowsArray!: number[];
  columnLabels!: string[];

  formSubmit() {
    console.log(this.numRows);
    console.log(this.numCols);
    console.log(this.numColors);
    this.rowsArray = Array(this.numRows).fill(0);
    this.columnLabels = this.generateColumnLabels(this.numCols);
    this.createTable();
  }

  generateColumnLabels(count: number): string[] {
    const labels: string[] = [];
    for (let i = 0; i < count; i++) {
      let label = '';
      let temp = i;
      do {
        label = String.fromCharCode((temp % 26) + 65) + label;
        temp = Math.floor(temp / 26) - 1;
      } while (temp >= 0);
      labels.push(label);
    }
    return labels;
  }
  onCellClick(col: string, row: number) {
    alert(`${col}${row}`);
  }

  //////////////////////////////////////////////////////////////////
  colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'grey', 'brown', 'black', 'teal'];
  previousSelections = new Map<HTMLSelectElement, string>();

  createTable(): void {
    const table = document.getElementById('colorTable')!;
    table.innerHTML = '';
    const usedColors = new Set<string>();

    for (let i = 0; i < this.numColors; i++) {
      const row = document.createElement('tr');

      const leftColumn = document.createElement('td');
      leftColumn.style.width = '20%';

      const radioButton = document.createElement('input');
      radioButton.type = 'radio';
      radioButton.name = 'selectedColor';
      radioButton.style.width = '25px';
      radioButton.style.scale = '1.25';
      radioButton.style.borderColor = '#d2adf4';
      radioButton.onclick = () => this.unselectOtherRadioButtons(radioButton);
      leftColumn.appendChild(radioButton);

      const colorDropdown = document.createElement('select');
      colorDropdown.name = `color-${i}`;
      colorDropdown.dataset['rowIndex'] = i.toString();
      this.colors.forEach(color => {
        const option = document.createElement('option');
        option.value = color;
        option.textContent = color.charAt(0).toUpperCase() + color.slice(1);
        colorDropdown.appendChild(option);
      });

      const defaultColor = this.colors[i];
      colorDropdown.value = defaultColor;
      usedColors.add(defaultColor);
      this.previousSelections.set(colorDropdown, defaultColor);
      colorDropdown.addEventListener('change', () => this.handleColorSelection(colorDropdown));
      colorDropdown.style.borderColor='#422d4d';
      colorDropdown.style.borderRadius='10px';
      colorDropdown.style.borderWidth='2px';
      colorDropdown.style.padding='5px';

      leftColumn.appendChild(colorDropdown);
      row.appendChild(leftColumn);

      const rightColumn = document.createElement('td');
      rightColumn.style.width = '80%';
      row.appendChild(rightColumn);

      table.appendChild(row);
      table.style.padding = '15px';
    }
  }

  unselectOtherRadioButtons(currentRadioButton: HTMLInputElement): void {
    const radios = document.querySelectorAll('input[type="radio"]');
    radios.forEach(radio => {
      if (radio !== currentRadioButton) {
        (radio as HTMLInputElement).checked = false;
      }
    });
  }

  handleColorSelection(changedDropdown: HTMLSelectElement): void {
    const selectedColor = changedDropdown.value;
    const allDropdowns = document.querySelectorAll('select');
    for (const dropdown of allDropdowns) {
      if (dropdown !== changedDropdown && (dropdown as HTMLSelectElement).value === selectedColor) {
        const previous = this.previousSelections.get(changedDropdown);
        changedDropdown.value = previous!;
        alert(`Color "${selectedColor}" is already selected. Please choose a different color.`);
        return;
      }
    }

    this.previousSelections.set(changedDropdown, selectedColor);
  }

  
}
