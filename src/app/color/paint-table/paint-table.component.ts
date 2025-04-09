import { Component, Input } from "@angular/core";

@Component({
    selector: 'paint-table',
    standalone: true,
    templateUrl: './paint-table.component.html',
    styleUrl: './paint-table.component.css'
})

export class PaintTableComponent {
    @Input() numRows!: number;
    @Input() numCols!: number;
}
