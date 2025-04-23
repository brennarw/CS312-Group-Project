import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
@Component({
    selector: 'paint-table',
    standalone: true,
    templateUrl: './paint-table.component.html',
    styleUrl: './paint-table.component.css',
    imports: [CommonModule]
})

export class PaintTableComponent {
    @Input() numRows!: number;
    @Input() numCols!: number;
    @Input() selectedColor!: string;
    @Input() filledCells!: { [key: string]: string };
    @Input() radioRows!: {color:string, coloredCells: string[]}[];
    @Input() activeRadioIndex!: number;

    get columns(): string[] {
        const labels: string[] = [];

        for (let i = 0; i < this.numCols; i++) {
            let label = '';
            let n = i;
            do {
                // convert number to letter based on ascii
                label = String.fromCharCode((n % 26) + 65) + label;
                // get consecutive letters if needed
                n = Math.floor(n / 26) - 1;
            } while (n >= 0);
            labels.push(label);
        }
        return labels;
    }

    get rows(): number[] {
        return Array.from({ length: this.numRows }, (_, i) => i + 1);
    }

    onCellClick(row: number, col: string) {
        const key = `${col}${row}`;
        this.filledCells[key] = this.selectedColor;
        console.log(key);
        //check to see if this cell is already assigned to a color - if thats the case then remove that key from the assigned color
        this.radioRows.forEach((radio) => {
            if(radio.coloredCells.includes(key)){
                radio.coloredCells.splice(radio.coloredCells.indexOf(key), 1);
            }
        })
        if(this.selectedColor != ''){
            this.radioRows[this.activeRadioIndex].coloredCells.push(key);
        }
    }

      
}
