import { Injectable } from '@angular/core';
import { Producto } from '../models/producto.model';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions, ContentTable, TableCell } from 'pdfmake/interfaces';

(pdfMake as any).vfs = (pdfFonts as any).pdfMake?.vfs ?? (pdfFonts as any).vfs;

@Injectable({ providedIn: 'root' })
export class ReporteProductoService {

  private readonly C = {
    BLUE_DARK: '#1e40af', BLUE_MID: '#2563eb', BLUE_LIGHT: '#dbeafe',
    GRAY: '#374151', GRAY_LIGHT: '#f3f4f6',
    GREEN: '#166534', GREEN_BG: '#dcfce7',
    RED: '#991b1b', RED_BG: '#fee2e2', WHITE: '#ffffff'
  };

  generarReporte(productos: Producto[]): void {
    const fecha = new Date().toLocaleDateString('es-ES', {
      year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });

    const doc: TDocumentDefinitions = {
      pageSize: 'A4',
      pageMargins: [40, 50, 40, 50],
      defaultStyle: { font: 'Roboto', fontSize: 10, color: this.C.GRAY },

      header: (_p: number, _t: number) => ({
        columns: [
          { text: 'Sistema de Gestión de Productos', fontSize: 8, bold: true, color: this.C.BLUE_MID, margin: [40, 18, 0, 0] },
          { text: `Página ${_p} de ${_t}`, fontSize: 8, color: '#9ca3af', alignment: 'right', margin: [0, 18, 40, 0] }
        ]
      }),

      footer: () => ({
        canvas: [{ type: 'line', x1: 40, y1: 15, x2: 555, y2: 15, lineWidth: 0.5, lineColor: '#e5e7eb' }]
      }),

      content: [
        {
          table: {
            widths: ['*'],
            body: [[
              {
                stack: [
                  { text: 'REPORTE DE PRODUCTOS', fontSize: 15, bold: true, color: this.C.WHITE, margin: [0, 0, 0, 4] },
                  { text: `Generado el ${fecha}`, fontSize: 8, color: '#bfdbfe' }
                ],
                fillColor: this.C.BLUE_DARK,
                margin: [20, 16, 20, 16],
                border: [false, false, false, false]
              }
            ]]
          },
          layout: { defaultBorder: false },
          margin: [0, 0, 0, 24]
        } as ContentTable,

        { text: 'Listado de Productos', fontSize: 13, bold: true, color: this.C.BLUE_DARK, alignment: 'center', margin: [0, 0, 0, 10] },

        this.buildTabla(productos),

        {
          table: {
            widths: ['*'],
            body: [[{
              text: `Documento generado automáticamente · Total de registros: ${productos.length}`,
              fontSize: 8, color: '#6b7280', alignment: 'center',
              fillColor: this.C.BLUE_LIGHT, border: [false, false, false, false],
              margin: [0, 8, 0, 8]
            }]]
          },
          layout: { defaultBorder: false },
          margin: [0, 20, 0, 0]
        } as ContentTable
      ]
    };

    pdfMake.createPdf(doc).download(`reporte-productos-${Date.now()}.pdf`);
  }

  private buildTabla(productos: Producto[]): ContentTable {
    const h = (text: string, align?: 'center' | 'right'): TableCell =>
      ({ text, bold: true, fontSize: 9, color: this.C.WHITE, fillColor: this.C.BLUE_DARK, margin: [0, 4, 0, 4], ...(align ? { alignment: align } : {}) });

    const encabezado: TableCell[] = [h('ID', 'center'), h('Nombre'), h('Descripción'), h('Precio', 'right'), h('Stock', 'center'), h('Estado', 'center')];

    const filas: TableCell[][] = productos.map((p, i) => {
      const bg = i % 2 === 0 ? this.C.WHITE : this.C.GRAY_LIGHT;
      const ok = p.stock > 0;
      return [
        { text: String(p.id ?? '—'), alignment: 'center', fillColor: bg, color: '#6b7280', fontSize: 9 },
        { text: p.nombre, bold: true, fillColor: bg, color: this.C.GRAY, fontSize: 9 },
        { text: p.descripcion, fillColor: bg, color: '#6b7280', fontSize: 8 },
        { text: `$${p.precio.toFixed(2)}`, alignment: 'right', bold: true, fillColor: bg, color: '#059669', fontSize: 9 },
        { text: String(p.stock), alignment: 'center', fillColor: bg, color: this.C.GRAY, fontSize: 9 },
        { text: ok ? 'Disponible' : 'Sin stock', alignment: 'center', bold: true, fontSize: 8, fillColor: ok ? this.C.GREEN_BG : this.C.RED_BG, color: ok ? this.C.GREEN : this.C.RED }
      ] as TableCell[];
    });

    return {
      table: { headerRows: 1, widths: [30, 100, '*', 55, 40, 60], body: [encabezado, ...filas] },
      layout: {
        hLineWidth: (i: number, n: any) => (i === 0 || i === n.table.body.length) ? 0 : 0.5,
        vLineWidth: () => 0,
        hLineColor: () => '#e5e7eb',
        paddingLeft: () => 10, paddingRight: () => 10, paddingTop: () => 7, paddingBottom: () => 7,
        fillColor: () => null
      }
    };
  }
}
