import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.html',
  styleUrl: './modal.css',
})
export class ModalComponent implements AfterViewInit, OnDestroy {
  @Input({ required: true }) label!: string;
  @Output() dismissed = new EventEmitter<void>();
  @ViewChild('dialog', { static: true }) private dialogRef?: ElementRef<HTMLDialogElement>;

  ngAfterViewInit(): void {
    const dialog = this.dialogRef?.nativeElement;
    if (dialog && !dialog.open) {
      dialog.showModal();
    }
  }

  ngOnDestroy(): void {
    const dialog = this.dialogRef?.nativeElement;
    if (dialog?.open) {
      dialog.close();
    }
  }

  onCancel(event: Event): void {
    event.preventDefault();
    this.dismiss();
  }

  onDialogClick(event: MouseEvent): void {
    const dialog = this.dialogRef?.nativeElement;
    if (!dialog || event.target !== dialog) {
      return;
    }

    const bounds = dialog.getBoundingClientRect();
    const clickedOutside =
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom;

    if (clickedOutside) {
      this.dismiss();
    }
  }

  private dismiss(): void {
    const dialog = this.dialogRef?.nativeElement;
    if (dialog?.open) {
      dialog.close();
    }
    this.dismissed.emit();
  }
}
