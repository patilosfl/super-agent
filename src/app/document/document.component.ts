import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { PortfolioService } from '../services/portfolio.service';
import { DocumentService } from '../services/document.service';

@Component({
  selector: 'app-document',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatSelectModule, MatButtonModule, MatDividerModule, MatListModule, MatIconModule],
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {
  portfolio: any = {};
  templates: any[] = [];
  selectedTemplateId = '';
  exportType: 'pptx' | 'pdf' = 'pptx';
  recentDocs: any[] = [];

  constructor(
    private portfolioSvc: PortfolioService,
    private docSvc: DocumentService
  ) {}

  ngOnInit() {
    this.portfolio = this.portfolioSvc.getMockPortfolio();
    this.templates = this.docSvc.getTemplates();
    this.recentDocs = this.docSvc.getRecentDocuments();
    if (this.templates.length) this.selectedTemplateId = this.templates[0].id;
  }

  onGenerate() {
    const tpl = this.templates.find(t => t.id === this.selectedTemplateId);
    if (!tpl) return;

    if (this.exportType === 'pptx') {
      this.docSvc.generatePptx(this.portfolio, tpl).then(() => {
        this.recentDocs = this.docSvc.getRecentDocuments();
      });
    } else {
      this.docSvc.generatePdf(this.portfolio, tpl).then(() => {
        this.recentDocs = this.docSvc.getRecentDocuments();
      });
    }
  }

  openUrl(url: string | undefined) {
    if (!url) {
      alert('No URL available for this document');
      return;
    }
    window.open(url, '_blank');
  }
}
