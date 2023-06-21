import { Injectable } from '@angular/core';
import {
  HttpClient, HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SowtrackerService {

 
 
  constructor(private http: HttpClient) { }
  getSummaryDetails(category: any): Observable<any> {
    let API_URL = `https://sw-tracker-api.azurewebsites.net/api/SoWTracker/GetSoWTrackerSummary/${category}`;
    return this.http.get(API_URL).pipe(catchError(this.errorHandler));

  }
  getSowReviewDetails(category: any): Observable<any> {
    let API_URL = `https://sw-tracker-api.azurewebsites.net/api/SoWReview/GetSoWReview/${category}`;
    return this.http.get(API_URL).pipe(catchError(this.errorHandler));
  }
  updateSowReviewDetails(data: any): Observable<any> {
    let API_URL = `https://sw-tracker-api.azurewebsites.net/api/SoWReview/AddSoWReview`;
    return this.http.post(API_URL,data).pipe(catchError(this.errorHandler));
  }
  getSummaryDetailsAfterReview(createdNumber: any): Observable<any> {
    let API_URL = `https://sw-tracker-api.azurewebsites.net/api/SoWTracker/GetSoWTrackerSummary/${createdNumber}`;
    return this.http.get(API_URL).pipe(catchError(this.errorHandler));

  }
   // Handle Errors
   errorHandler(error: HttpErrorResponse){
    return throwError(error.message || "Server Error");
   }
}
