import { Injectable } from '@angular/core';
import * as PptxGenJS from 'pptxgenjs';
import { saveAs } from 'file-saver';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Injectable({ providedIn: 'root' })
export class DocumentService {
  getTemplates() {
    return [
      { id: 'basic', name: 'Basic Template', description: 'Simple layout with project summary' },
      { id: 'modern', name: 'Modern Template', description: 'Stylish layout with highlights' }
    ];
  }

  async generatePptx(portfolio: any, tpl: any) {
  const PptxGenCtor: any = (PptxGenJS as any).default || PptxGenJS;
  const pptx = new PptxGenCtor();
    const slide = pptx.addSlide();
    slide.addText(`${portfolio.name}`, { x: 1, y: 0.5, fontSize: 24, bold: true });
    slide.addText(`${portfolio.role}`, { x: 1, y: 1 });
    slide.addText(`${portfolio.summary}`, { x: 1, y: 1.5, w: 8, h: 2, fontSize: 14 });

    portfolio.projects.forEach((p: any, idx: number) => {
      const s = pptx.addSlide();
      s.addText(p.title, { x: 1, y: 0.5, fontSize: 20, bold: true });
      s.addText(p.summary, { x: 1, y: 1, w: 8, h: 2 });
    });

    const fileName = `${portfolio.name.replace(/\s+/g, '_')}_${Date.now()}.pptx`;
    await pptx.writeFile(fileName);
    this.saveRecentDocument(fileName);
  }

  async generatePdf(portfolio: any, tpl: any) {
    const docDefinition = {
      content: [
        { text: portfolio.name, style: 'header' },
        { text: portfolio.role, style: 'subheader' },
        { text: portfolio.summary, margin: [0, 10, 0, 10] },
        { text: 'Projects', style: 'subheader' },
        ...portfolio.projects.map((p: any) => ({
          text: `${p.title}: ${p.summary}`,
          margin: [0, 5, 0, 0]
        }))
      ],
      styles: {
        header: { fontSize: 22, bold: true },
        subheader: { fontSize: 16, bold: true }
      }
    };

    const pdfDoc = pdfMake.createPdf(docDefinition);
    const fileName = `${portfolio.name.replace(/\s+/g, '_')}_${Date.now()}.pdf`;
    pdfDoc.download(fileName);
    this.saveRecentDocument(fileName);
  }

  getRecentDocuments() {
    const data = localStorage.getItem('recentDocs');
    return data ? JSON.parse(data) : [];
  }

  private saveRecentDocument(name: string) {
    const docs = this.getRecentDocuments();
    docs.unshift({ name, date: new Date() });
    localStorage.setItem('recentDocs', JSON.stringify(docs.slice(0, 5)));
  }
}
