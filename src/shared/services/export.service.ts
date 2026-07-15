// ========================================
// EXPORT SERVICE (compartilhado)
// ========================================
// Gera arquivos de exportação (XLSX e PDF) a partir de dados tabulares.
// Reutilizado pelos módulos de pesagem, vacinação e mortalidade —
// cada módulo só define suas colunas e formata suas linhas.

import ExcelJS from "exceljs";
import PDFDocument from "pdfkit";

export interface ExportColumn {
   header: string;
   key: string;
   width?: number;
}

/**
 * Gera um arquivo XLSX em memória (Buffer) a partir de colunas + linhas.
 * Genérico o suficiente pra qualquer módulo do sistema — só muda a config.
 */
export async function generateXlsx(
   sheetName: string,
   columns: ExportColumn[],
   rows: Array<Record<string, unknown>>,
): Promise<Buffer> {
   const workbook = new ExcelJS.Workbook();
   workbook.creator = "app-pecuaria";
   workbook.created = new Date();

   const sheet = workbook.addWorksheet(sheetName);
   sheet.columns = columns.map(c => ({ header: c.header, key: c.key, width: c.width ?? 20 }));
   sheet.getRow(1).font = { bold: true };
   sheet.getRow(1).alignment = { vertical: "middle" };

   rows.forEach(row => {
      sheet.addRow(row);
   });

   const arrayBuffer = await workbook.xlsx.writeBuffer();
   return Buffer.from(arrayBuffer);
}

/**
 * Gera um PDF tabular simples (título + cabeçalho + linhas), com quebra de
 * página automática. Retorna o PDFDocument já finalizado (chamar .end() é
 * responsabilidade de quem chama .pipe() no controller, então NÃO chamamos
 * doc.end() aqui — o controller decide quando terminar de escrever no stream).
 */
export function generateTablePdf(
   title: string,
   subtitle: string,
   columns: ExportColumn[],
   rows: Array<Record<string, unknown>>,
): PDFKit.PDFDocument {
   const doc = new PDFDocument({ margin: 40, size: "A4" });

   doc.fontSize(16).fillColor("#1B4332").text(title, { align: "left" });
   doc.fontSize(9).fillColor("#666666").text(subtitle);
   doc.moveDown(0.8);

   const startX = doc.page.margins.left;
   const usableWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;
   const colWidth = usableWidth / columns.length;

   function drawHeader(y: number): number {
      doc.fontSize(9).fillColor("#000000").font("Helvetica-Bold");
      columns.forEach((col, i) => {
         doc.text(col.header, startX + i * colWidth, y, {
            width: colWidth - 4,
            ellipsis: true,
         });
      });
      const headerBottom = y + 14;
      doc.moveTo(startX, headerBottom)
         .lineTo(startX + usableWidth, headerBottom)
         .strokeColor("#cccccc")
         .stroke();
      return headerBottom + 6;
   }

   let y = drawHeader(doc.y);
   doc.font("Helvetica").fontSize(9).fillColor("#000000");

   rows.forEach(row => {
      // Quebra de página quando chega perto do rodapé
      if (y > doc.page.height - doc.page.margins.bottom - 20) {
         doc.addPage();
         y = drawHeader(doc.page.margins.top);
         doc.font("Helvetica").fontSize(9).fillColor("#000000");
      }

      columns.forEach((col, i) => {
         const value = row[col.key];
         const text = value === null || value === undefined || value === "" ? "-" : String(value);
         doc.text(text, startX + i * colWidth, y, {
            width: colWidth - 4,
            ellipsis: true,
         });
      });
      y += 16;
   });

   if (rows.length === 0) {
      doc.fontSize(10).fillColor("#999999").text("Nenhum registro encontrado.", startX, y);
   }

   return doc;
}
