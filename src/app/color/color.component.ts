import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-color',
  standalone: true, // 
  imports: [CommonModule, RouterModule], 
  templateUrl: './color.component.html',
  styleUrl: './color.component.css'
})
export class ColorComponent {
  numRows: number = 22;
  numCols: number = 41; 
  rowsArray: number[] = Array(this.numRows).fill(0);
  columnLabels: string[] = this.generateColumnLabels(this.numCols);

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
}
