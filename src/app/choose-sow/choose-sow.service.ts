import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChooseSowService {
  constructor(private http: HttpClient) { }
  getYears(): Observable<any> {
    let API_URL = 'https://sw-tracker-api.azurewebsites.net/api/SoWTracker/GetYears';
    return this.http.get(API_URL).pipe(catchError(this.errorHandler));
  }
  getOriginalSow(): Observable<any> {
    let API_URL = 'https://sw-tracker-api.azurewebsites.net/api/SoWTracker/GetOrigialSoWs';
    return this.http.get(API_URL).pipe(catchError(this.errorHandler));
  }
  generateSOWCR(sow:any): Observable<any> {
    let API_URL = `https://sw-tracker-api.azurewebsites.net/api/SoWTracker/GenerateSOWCR/${sow}`;
    return this.http.get(API_URL).pipe(catchError(this.errorHandler));
  }
  generateOriginalSOW(region:any,year:any): Observable<any> {
    let API_URL = `https://sw-tracker-api.azurewebsites.net/api/SoWTracker/GenerateOriginalSOW/${region}/${year}`;
    return this.http.get(API_URL).pipe(catchError(this.errorHandler));
  }
 
   // Handle Errors
   errorHandler(error: HttpErrorResponse){
    return throwError(error.message || "Server Error");
   }
}
