import { throwDialogContentAlreadyAttachedError } from '@angular/cdk/dialog';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {MatAccordion} from '@angular/material/expansion';
import { ActivatedRoute, Router } from '@angular/router';
import { AutoWidthCalculator } from 'ag-grid-community';
import { SowtrackerService } from '../sow-tracker/sowtracker.service';
import { ReviewDialogComponent } from './review-dialog/review-dialog.component';
@Component({
  selector: 'app-review-so-w',
  templateUrl: './review-so-w.component.html',
  styleUrls: ['./review-so-w.component.scss']
})
export class ReviewSoWComponent implements OnInit {
  constructor(public dialog: MatDialog,private route: ActivatedRoute,
    private sowtrackerservice: SowtrackerService,
    private router: Router) { }


   step:number=0;
   stepCopy:number=0;
   progressSteps:any;
   progressBar:any;
   reviewDetails:any=null;
   isReady:boolean=false;

   reviewFormSection1:any;
   reviewFormSection2:any;
   reviewFormSection3:any;
   reviewFormSection4:any;
   reviewFormSection5:any;
   reviewFormSection6:any;


  ngOnInit(): void {
    
    this.route.queryParamMap.subscribe((params:any) =>
      this.getSowReviewDetails(params)
    );
    
  }

  openDialog(){
    this.sowtrackerservice.updateSowReviewDetails(this.createRequestObject()).subscribe(res=>{
      const dialogRef = this.dialog.open(ReviewDialogComponent, {
        width: '400px'
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    })
  }

  openReviewDialog() {
    if((this.stepCopy+2)==3){
      document.getElementById('reviewFormSection2')?.click();
      if(this.reviewFormSection2.status=="VALID"){
      this.openDialog();
      }
    }else if((this.stepCopy+2)==4){
      document.getElementById('reviewFormSection3')?.click();
      if(this.reviewFormSection3.status=="VALID"){
      this.openDialog();
      }
    }else if((this.stepCopy+2)==5){
      document.getElementById('reviewFormSection4')?.click();
      if(this.reviewFormSection4.status=="VALID"){
      this.openDialog();
      }
    }else if((this.stepCopy+2)==6){
      document.getElementById('reviewFormSection5')?.click();
      if(this.reviewFormSection5.status=="VALID"){
      this.openDialog();
      }
    }else if((this.stepCopy+2)==7){
      document.getElementById('reviewFormSection6')?.click();
      if(this.reviewFormSection6.status=="VALID"){
      this.openDialog();
      }
    }else{
      alert("All approvals are done & Final SoW Submitted to Client.")
    }
   
  }


  getSowReviewDetails(params: any) {
    this.sowtrackerservice.getSowReviewDetails(params.params.category)
      .subscribe(response => {
        this.reviewDetails = response.data; 
        console.log(this.reviewDetails,"detail is")
        if(this.reviewDetails.soWStatus.trim()=="Create SOW"){
          this.step=1;
        }
        if(this.reviewDetails.soWStatus.trim()=="Testing team & Architect Review Pending"){
          this.step=1;
        }
        if(this.reviewDetails.soWStatus.trim()=="Submitted by Offshore PM Pending"){
          this.step=2;
        }
        if(this.reviewDetails.soWStatus.trim()=="1st Approval Pending"){
          this.step=3;
        }        
        if(this.reviewDetails.soWStatus.trim()=="2nd Approval Pending"){
          this.step=4;
        }
        if(this.reviewDetails.soWStatus.trim()=="Final Approval Pending"){
          this.step=5;
        }
        if(this.reviewDetails.soWStatus.trim()=="Final SoW Submitted to Client"){
          this.step=6;
        }
        this.stepCopy=this.step;
       
        this.createReviewForm()
        
        this.isReady=true;
        setTimeout(() => {
          this.progressSteps=document.getElementsByClassName('progress-step');
        this.progressBar=document.getElementsByClassName('progress') as HTMLCollectionOf<HTMLElement>;
        this.updateProgress()
        }, 100);
      });
  }

  updateProgress(){
    for(let i=0;i<this.step;i++){
      this.progressSteps[i].classList.add('progress-step-active')
    }
    this.step=this.step<5?this.step:5
    for(let i=0;i<this.step;i++){
      this.progressBar[i].style.width='13.8%'
    }
    if(this.stepCopy!=6 && this.step!=0)
    this.progressBar[this.step-1].style.width='11.2%'
  }


  createReviewForm(){
         this.reviewFormSection2 = new FormGroup({
          TestApproved: new FormControl(this.reviewDetails.testApproved, [Validators.required]),
          TestApprovedName: new FormControl(this.reviewDetails.testApprovedName, [Validators.required]),
          TestEmailID: new FormControl(this.reviewDetails.testEmailID,[Validators.required]),
          ArcApproved: new FormControl(this.reviewDetails.arcApproved,[Validators.required]),
          ArcApprovedName: new FormControl(this.reviewDetails.arcApprovedName,[Validators.required]),
          ArcEmailID: new FormControl(this.reviewDetails.arcEmailID,[Validators.required]),
          Reason: new FormControl(this.reviewDetails.reason,[Validators.required]) 
        })
         this.reviewFormSection3 = new FormGroup({
          OffshorePMName: new FormControl(this.reviewDetails.offshorePMName, [Validators.required]),
          OffshorePMEmail: new FormControl(this.reviewDetails.offshorePMEmail, [Validators.required])
        })
         this.reviewFormSection4 = new FormGroup({
          OffshoreDMName: new FormControl(this.reviewDetails.offshoreDMName, [Validators.required]),
          OffshoreDMEmail: new FormControl(this.reviewDetails.offshoreDMEmail, [Validators.required])
        })
         this.reviewFormSection5 = new FormGroup({
          OnshoreDMName: new FormControl(this.reviewDetails.onshoreDMName, [Validators.required]),
          OnshoreDMEmail: new FormControl(this.reviewDetails.onshoreDMEmail,[Validators.required])
        })
        this.reviewFormSection6 = new FormGroup({
          FinalAprName: new FormControl(this.reviewDetails.finalAprName, [Validators.required]),
          FinalAprEmail: new FormControl(this.reviewDetails.finalAprEmail, [Validators.required])
        })    
  }


  createRequestObject(){
    return{
      "SoWID" : this.reviewDetails.soWID,
      "Status" : this.step+2, 
      "soWPattern": this.reviewDetails.soWPattern,
      "TestApproved" : (this.step+2)==3?this.reviewFormSection2.value.TestApproved:"",
      "TestApprovedName" :(this.step+2)==3?this.reviewFormSection2.value.TestApprovedName:"",
      "TestEmailID": (this.step+2)==3?this.reviewFormSection2.value.TestEmailID:"",
      "ArcApproved": (this.step+2)==3?this.reviewFormSection2.value.ArcApproved:"",
      "ArcApprovedName" : (this.step+2)==3?this.reviewFormSection2.value.ArcApprovedName:"",
      "ArcEmailID": (this.step+2)==3?this.reviewFormSection2.value.ArcEmailID:"",
      "Reason": (this.step+2)==3?this.reviewFormSection2.value.Reason:"",  
      "OffshorePMName" : (this.step+2)==4?this.reviewFormSection3.value.OffshorePMName:"",
      "OffshorePMEmail" : (this.step+2)==4?this.reviewFormSection3.value.OffshorePMEmail:"",
      "OffshoreDMName" : (this.step+2)==5?this.reviewFormSection4.value.OffshoreDMName:"",
      "OffshoreDMEmail" : (this.step+2)==5?this.reviewFormSection4.value.OffshoreDMEmail:"",
      "OnshoreDMName" : (this.step+2)==6?this.reviewFormSection5.value.OnshoreDMName:"",
      "OnshoreDMEmail" : (this.step+2)==6?this.reviewFormSection5.value.OnshoreDMEmail:"",
      "FinalAprName" : (this.step+2)==7?this.reviewFormSection6.value.FinalAprName:"",
      "FinalAprEmail" : (this.step+2)==7?this.reviewFormSection6.value.FinalAprEmail:"",
      "UpdatedBy" : "Kota.Malli.Kishore@ibm.com"
  }
  }

  formatDate(date:any) {
    if(date==null) return null;
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [day, month, year].join('-');
}

goToDashboard() {
  this.router.navigate([('/')]);
}
}
