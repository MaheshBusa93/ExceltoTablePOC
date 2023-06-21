import { Injectable } from '@angular/core';
import {
  HttpClient, HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
declare var saveAs:any;

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';          
const EXCEL_EXTENSION = '.xlsx';  
@Injectable({
  providedIn: 'root'
})

export class DashboardService {
  apiUrl: string = 'https://sw-tracker-api.azurewebsites.net/api/searchsow/GetAllBusinessUnits';
  constructor(private http: HttpClient) { }

  getBUValues(): Observable<any> {
    let API_URL = `${this.apiUrl}`;
    return this.http.get(API_URL).pipe(catchError(this.errorHandler));

  }
  getCIOValues(value: any): Observable<any> {
    console.log(value)
    let API_URL = `https://sw-tracker-api.azurewebsites.net/api/searchsow/GetAllCIOS/${value}`;
    return this.http.get(API_URL).pipe(catchError(this.errorHandler));

  }

  getChubbManagerValues(value: any): Observable<any> {
    console.log(value)
    let API_URL = `https://sw-tracker-api.azurewebsites.net/api/searchsow/GetAllChubbManagers/${value}`;
    return this.http.get(API_URL).pipe(catchError(this.errorHandler));

  }
  gridDetailsService(data: any): Observable<any> {
   
    let API_URL_GRID = 'https://sw-tracker-api.azurewebsites.net/api/searchsow/GetDashboardSearch';
    return this.http.post(API_URL_GRID, data).pipe(catchError(this.errorHandler));

  }
  public exportAsExcelFile(json: any[], excelFileName: string): void {  
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);  
    console.log('worksheet', worksheet);  
    const workbook: XLSX.WorkBook = {  
        Sheets: {  
            'data': worksheet  
        },  
        SheetNames: ['data']  
    };  
    const excelBuffer: any = XLSX.write(workbook, {  
        bookType: 'xlsx',  
        type: 'array'  
    });  
    this.saveAsExcelFile(excelBuffer, excelFileName);  
}  
private saveAsExcelFile(buffer: any, fileName: string): void {  
    const data: Blob = new Blob([buffer], {  
        type: EXCEL_TYPE  
    });  
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds() + EXCEL_EXTENSION);  
}  
   // Handle Errors
   errorHandler(error: HttpErrorResponse){
    return throwError(error.message || "Server Error");
   }
}