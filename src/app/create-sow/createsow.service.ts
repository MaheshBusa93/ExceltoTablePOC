import { Injectable } from '@angular/core';
import {
  HttpClient, HttpErrorResponse,
} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CreatesowService {
  apiUrl: string = 'https://sw-tracker-api.azurewebsites.net/api/SoWTracker/GetOnShoreDMS';
  apiUrlOffshore: string = 'https://sw-tracker-api.azurewebsites.net/api/SoWTracker/GetOffShoreDMS';

  constructor(private http: HttpClient) { }
  private originalSoWObs$: BehaviorSubject<any> = new BehaviorSubject(null);
  private fromCreateFlowObs$: BehaviorSubject<any> = new BehaviorSubject(null);

  getOnshoreDMs(): Observable<any> {
    let API_URL = `${this.apiUrl}`;
    return this.http.get(API_URL).pipe(catchError(this.errorHandler));

  }
  getOffshoreDMs(): Observable<any> {
    let API_URL = `${this.apiUrlOffshore}`;
    return this.http.get(API_URL).pipe(catchError(this.errorHandler));

  }
  setOriginalSoWNumber(originalSowNo: any) {
    this.originalSoWObs$.next(originalSowNo);
  }
  getOriginalSoWNumber(): Observable<any> {
    return this.originalSoWObs$.getValue();
  }
  setFromCreateSoW(fromCreateFlowValue: any) {
    this.fromCreateFlowObs$.next(fromCreateFlowValue);
  }
  getFromCreateSoW(): Observable<any> {
    return this.fromCreateFlowObs$.getValue();
  }
  addNewSOW(data: any): Observable<any> {
    let API_URL_ADD_SOW = 'https://sw-tracker-api.azurewebsites.net/api/SoWTracker/AddNewSoWTracker';
    return this.http.post(API_URL_ADD_SOW, data).pipe(catchError(this.errorHandler));
  }
  // Handle Errors
  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || "Server Error");
  }
}
