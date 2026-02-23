import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Producto } from '../models/producto.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/productos`;

  getAll(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  getById(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  create(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.apiUrl, producto)
      .pipe(catchError(this.handleError));
  }

  update(id: number, producto: Producto): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, producto)
      .pipe(catchError(this.handleError));
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocurrió un error desconocido';
    
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      errorMessage = `Error ${error.status}: ${error.message}`;
      if (error.error && typeof error.error === 'string') {
        errorMessage = error.error;
      } else if (error.error && error.error.message) {
        errorMessage = error.error.message;
      }
    }
    
    return throwError(() => errorMessage);
  }
}
