import { Component, Input } from '@angular/core';

@Component({
  selector: 'control',
  imports: [],
  templateUrl: './control.html',
  styleUrl: './control.css',
})
export class ControlComponent {
  @Input({ required: true }) label!: string;
  @Input({ required: true }) forId!: string;
  @Input() required = false;
}
