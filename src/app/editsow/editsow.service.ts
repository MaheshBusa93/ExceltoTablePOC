import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EditsowService {
  apiUrl: string = 'https://sw-tracker-api.azurewebsites.net/api/SoWTracker/GetOnShoreDMS';
  apiUrlOffshore: string = 'https://sw-tracker-api.azurewebsites.net/api/SoWTracker/GetOffShoreDMS';

  
  constructor(private http: HttpClient) { }
  getSoWDetails(sowNumber: any): Observable<any> {
    let API_URL = `https://sw-tracker-api.azurewebsites.net/api/SoWTracker/GetSoWTrackerSummary/${sowNumber}`;
    return this.http.get(API_URL).pipe(catchError(this.errorHandler));

  }
  updateSoW(sow: any): Observable<any> {
    let API_URL = `https://sw-tracker-api.azurewebsites.net/api/SoWTracker/UpdateSoWTracker`;
    return this.http.post(API_URL,sow).pipe(catchError(this.errorHandler));

  }
  getOnshoreDMs(): Observable<any> {
    let API_URL = `${this.apiUrl}`;
    return this.http.get(API_URL).pipe(catchError(this.errorHandler));

  }
  getOffshoreDMs(): Observable<any> {
    let API_URL = `${this.apiUrlOffshore}`;
    return this.http.get(API_URL).pipe(catchError(this.errorHandler));

  }
   // Handle Errors
   errorHandler(error: HttpErrorResponse){
    return throwError(error.message || "Server Error");
   }
}
