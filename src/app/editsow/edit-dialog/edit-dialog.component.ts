import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit {

  constructor(private router:Router, public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }
  goToDashboard() {
    this.router.navigate([('/')]);
    this.dialogRef.close();
  }
  goToTrackerSummary(){
    this.router.navigate(['/sowTracker'], { queryParams: { category: this.data.sow } });
    this.dialogRef.close();
  }

}
