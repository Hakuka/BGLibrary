import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-control',
  imports: [],
  templateUrl: './control.html',
  styleUrl: './control.css',
})
export class ControlComponent {
  @Input({ required: true }) label!: string;
  @Input() forId?: string;
  @Input() required = false;
}
