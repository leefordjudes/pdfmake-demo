import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import * as fs from 'fs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async generatePdf(@Res() res: Response) {
    const pdf: PDFKit.PDFDocument = await this.appService.generatePdf();
    res.set('Content-Type', 'application/pdf');
    res.set('Content-Disposition', 'attachment; filename=output.pdf');
    pdf.pipe(res);
    pdf.end();
  }
}
