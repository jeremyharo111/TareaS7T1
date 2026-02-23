import { Component, EventEmitter, Output, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Producto } from '../../../models/producto.model';

@Component({
  selector: 'app-producto-form-modal',
  standalone: false,
  templateUrl: './producto-form-modal.html',
  styleUrls: ['./producto-form-modal.css']
})
export class ProductoFormModalComponent implements OnChanges {
  private fb = inject(FormBuilder);
  
  @Input() isOpen = false;
  @Input() producto: Producto | null = null;
  @Input() isEditMode = false;
  @Output() save = new EventEmitter<Producto>();
  @Output() close = new EventEmitter<void>();

  productoForm: FormGroup;

  constructor() {
    this.productoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', [Validators.required]],
      precio: [0, [Validators.required, Validators.min(0.01)]],
      stock: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['producto'] && this.producto) {
      this.productoForm.patchValue(this.producto);
    }
    
    if (changes['isOpen'] && !this.isOpen) {
      this.resetForm();
    }
  }

  onSubmit(): void {
    if (this.productoForm.valid) {
      const formValue = this.productoForm.value;
      const producto: Producto = {
        ...formValue,
        ...(this.isEditMode && this.producto?.id ? { id: this.producto.id } : {})
      };
      this.save.emit(producto);
      this.resetForm();
    }
  }

  onClose(): void {
    this.close.emit();
    this.resetForm();
  }

  private resetForm(): void {
    this.productoForm.reset({
      nombre: '',
      descripcion: '',
      precio: 0,
      stock: 0
    });
  }

  get f() {
    return this.productoForm.controls;
  }
}
