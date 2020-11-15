import { Injectable } from '@nestjs/common';
import * as path from 'path';
import PdfMaker = require('pdfmake');
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import * as _ from 'lodash';

const FONTS = {
  Roboto: {
    normal: path.join(__dirname, 'fonts/Roboto-Regular.ttf'),
    bold: path.join(__dirname, 'fonts/Roboto-Medium.ttf'),
    italics: path.join(__dirname, 'fonts/Roboto-Italic.ttf'),
    bolditalics: path.join(__dirname, 'fonts/Roboto-MediumItalic.ttf'),
  },
};

const pdfMaker = new PdfMaker(FONTS);


@Injectable()
export class AppService {


  async generatePdf() {
    const tableContentRow = [];
    for (let i=3; i<=50; i++) {
      tableContentRow.push([ 
        {text: i,style: 'tablerow', alignment: 'center'}, 
        {text:'02-10-2020', style: 'tablerow', alignment: 'left'}, 
        {text:`SALE/150${i}/20-21`, style: 'tablerow', alignment: 'left'}, 
        {text:'TRANSMODAL MARINE LOGISTICS PRIVATE LIMITED', style: 'tablerow', alignment: 'left'}, 
        {text:'33AADCT8600M1Z8', style: 'tablerow', alignment: 'left'}, 
        {text:'14579.72', style: 'tablerow', alignment: 'right'},  
        {text:'16973.00', style: 'tablerow', alignment: 'right'}, 
      ]);
    }
    const docDef: TDocumentDefinitions = {
      pageSize: 'A4',
      pageOrientation: 'landscape',
      pageMargins: [ 15, 15, 15, 15 ],
      content: [
        {text: 'VELAVAN HYPER MARKET BOOKS & STATIONERY', style: 'headline'},
        {text: '45, GIN FACTORY ROAD, TUTICORIN - 628 002', style: 'sub_headline'},
        {text: 'LANDLINE NO: - 0461 2383801, MOBILE NO:- 9842019102, 7373779102', style: 'sub_headline'},
        {
          columns: [
            {
              width: '2%',
              text: ''
            },
            {
              width: '*',
              text: 'Sale Tax Report',
              bold: true,
            },
            {
              width: '15%',
              text: [{text: 'From : ', bold: true},{text: '01-10-2020'}]
            },
            {
              width: '12%',
              text: [{text: 'To : ', bold: true}, {text: '31-10-2020'}]
            }
          ],
          columnGap: 10,
          lineHeight: 1.4
        },
        {
          layout: {
            paddingTop: (i) =>  ( i === 0 ? 0 : 3),
            paddingBottom: (i) =>  ( i === 0 ? 0 : 3),
          },
          table: {
            headerRows: 1,
            widths: [ '4%', '8%', '13%', '*', '14%', '10%', '10%' ],
            body: [
              [ 
                {text: 'SlNo', style: 'tableheading', alignment: 'center'}, 
                {text: 'Bill Date', style: 'tableheading', alignment: 'center'},
                {text: 'Bill No', style: 'tableheading', alignment: 'center'},
                {text: 'Customer Name', style: 'tableheading', alignment:'center'},
                {text: 'Customer GSTNo', style: 'tableheading', alignment:'left'},
                {text: 'Total Taxable Amount', style: 'tableheading', alignment: 'right'},
                {text: 'NET Amount',style: 'tableheading', alignment: 'right'} 
              ],
              [ 
                {text:'1',style: 'tablerow', alignment: 'center'}, 
                {text:'01-10-2020', style: 'tablerow', alignment: 'left'}, 
                {text:'SALE/1501/20-21', style: 'tablerow', alignment: 'left'}, 
                {text:'TRANSMODAL MARINE LOGISTICS PRIVATE LIMITED', style: 'tablerow', alignment: 'left'}, 
                {text:'33AADCT8600M1Z8', style: 'tablerow', alignment: 'left'}, 
                {text:'14579.72', style: 'tablerow', alignment: 'right'},  
                {text:'16973.00', style: 'tablerow', alignment: 'right'}, 
              ],
              [ 
                {text:'2',style: 'tablerow', alignment: 'center'}, 
                {text:'02-10-2020', style: 'tablerow', alignment: 'left'}, 
                {text:'SALE/1502/20-21', style: 'tablerow', alignment: 'left'}, 
                {text:'TRANSMODAL MARINE LOGISTICS PRIVATE LIMITED', style: 'tablerow', alignment: 'left'}, 
                {text:'33AADCT8600M1Z8', style: 'tablerow', alignment: 'left'}, 
                {text:'14579.72', style: 'tablerow', alignment: 'right'},  
                {text:'16973.00', style: 'tablerow', alignment: 'right'}, 
              ],
              ...tableContentRow,
            ]
          }
        }
      ],
      styles: {
        headline: {
          fontSize: 13,
          bold: true,
          lineHeight: 1.3,
          alignment: 'center',
        },
        sub_headline: {
          fontSize: 10,
          bold: true,
          lineHeight: 1.2,
          alignment: 'center',
        },
        tableheading: {
          bold: true,
          fontSize: 12,
          lineHeight: 1,
        },
        tablerow: {
          fontSize: 11,
        }
      },
    };
    return pdfMaker.createPdfKitDocument(docDef, {});
  }
}
