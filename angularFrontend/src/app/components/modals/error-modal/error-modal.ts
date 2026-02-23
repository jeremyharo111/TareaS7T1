import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-error-modal',
  standalone: false,
  templateUrl: './error-modal.html',
  styleUrls: ['./error-modal.css']
})
export class ErrorModalComponent {
  @Input() isOpen = false;
  @Input() title = 'Error';
  @Input() message = 'Ha ocurrido un error';
  @Output() close = new EventEmitter<void>();

  onClose(): void {
    this.close.emit();
  }
}
