import { Component, OnInit, inject } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { ReporteProductoService } from '../../services/reporte-producto.service';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-productos',
  standalone: false,
  templateUrl: './productos.html',
  styleUrls: ['./productos.css']
})
export class ProductosComponent implements OnInit {
  private productoService = inject(ProductoService);
  private reporteService = inject(ReporteProductoService);
  
  productos: Producto[] = [];
  isFormModalOpen = false;
  isConfirmModalOpen = false;
  isErrorModalOpen = false;
  isEditMode = false;
  selectedProducto: Producto | null = null;
  productoToDelete: number | null = null;
  errorMessage = '';
  isLoading = false;

  ngOnInit(): void {
    this.loadProductos();
  }

  loadProductos(): void {
    this.isLoading = true;
    this.productoService.getAll().subscribe({
      next: (data) => {
        this.productos = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.showError(error);
        this.isLoading = false;
      }
    });
  }

  openCreateModal(): void {
    this.isEditMode = false;
    this.selectedProducto = null;
    this.isFormModalOpen = true;
  }

  openEditModal(producto: Producto): void {
    this.isEditMode = true;
    this.selectedProducto = { ...producto };
    this.isFormModalOpen = true;
  }

  openDeleteModal(id: number): void {
    this.productoToDelete = id;
    this.isConfirmModalOpen = true;
  }

  closeFormModal(): void {
    this.isFormModalOpen = false;
    this.selectedProducto = null;
  }

  closeConfirmModal(): void {
    this.isConfirmModalOpen = false;
    this.productoToDelete = null;
  }

  closeErrorModal(): void {
    this.isErrorModalOpen = false;
    this.errorMessage = '';
  }

  saveProducto(producto: Producto): void {
    if (this.isEditMode && producto.id) {
      this.updateProducto(producto);
    } else {
      this.createProducto(producto);
    }
  }

  private createProducto(producto: Producto): void {
    this.productoService.create(producto).subscribe({
      next: () => {
        this.loadProductos();
        this.closeFormModal();
      },
      error: (error) => {
        this.showError(error);
      }
    });
  }

  private updateProducto(producto: Producto): void {
    if (!producto.id) return;
    
    this.productoService.update(producto.id, producto).subscribe({
      next: () => {
        this.loadProductos();
        this.closeFormModal();
      },
      error: (error) => {
        this.showError(error);
      }
    });
  }

  confirmDelete(): void {
    if (!this.productoToDelete) return;

    this.productoService.delete(this.productoToDelete).subscribe({
      next: () => {
        this.loadProductos();
        this.closeConfirmModal();
      },
      error: (error) => {
        this.closeConfirmModal();
        this.showError(error);
      }
    });
  }

  generarReporte(): void {
    this.reporteService.generarReporte(this.productos);
  }

  private showError(message: string): void {
    this.errorMessage = message;
    this.isErrorModalOpen = true;
  }
}
