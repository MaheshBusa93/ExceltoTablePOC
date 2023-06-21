import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { CreatesowService } from 'src/app/create-sow/createsow.service';

@Component({
  selector: 'app-review-dialog',
  templateUrl: './review-dialog.component.html',
  styleUrls: ['./review-dialog.component.scss']
})
export class ReviewDialogComponent implements OnInit {
  originalSoWFromCreateSoW: any;
  fromcreateFlow: boolean;

  constructor(private router:Router, public dialogRef: MatDialogRef<ReviewDialogComponent>,
    private createSoWService: CreatesowService
   ) { }

  ngOnInit(): void {
  }
  goToDashboard() {
    this.router.navigate([('/')]);
    this.dialogRef.close();
  }
  goToTrackerSummary(){
    this.router.navigate(['/sowTracker']);
    this.dialogRef.close();
    this.fromcreateFlow = true;
    this.createSoWService.setFromCreateSoW(this.fromcreateFlow);
    console.log("this.originalSoWFromCreateSoW", this.originalSoWFromCreateSoW);
  }

}
