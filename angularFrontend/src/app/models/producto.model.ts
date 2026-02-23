export interface Producto {
  id?: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  categoria?: string;
  descontinuado?: boolean;
  fechaCreacion?: string;
}
