import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  exportToExcel(arrayWs: Array<any>, arrayNombres: Array<string>, fileName: string)
  {
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    for(let i = 0; i < arrayWs.length; i++)
    {
      XLSX.utils.book_append_sheet(wb, arrayWs[i], arrayNombres[i]);  
    }
    XLSX.writeFile(wb, fileName +".xlsx");
  }  
}
