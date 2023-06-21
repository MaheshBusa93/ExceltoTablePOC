import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from '../dashboard/dashboard.service';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { EditsowService } from './editsow.service';

@Component({
  selector: 'app-editsow',
  templateUrl: './editsow.component.html',
  styleUrls: ['./editsow.component.scss']
})
export class EditsowComponent implements OnInit {
  posts: any;
  cioValues: any;
  chubbValues: any;
  onshoreDMOptions: any;
  offshoreDMOptions: any;

  formReady:boolean=false
  sowEditForm:any;

  editDetails:any;
  constructor(public dialog: MatDialog, private router: Router,
    private route: ActivatedRoute,
    private editSowService: EditsowService,
    private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.getBUOptions();
    this.getOnshoreDMList();
    this.getOffshoreDMList();
    this.createSowEditForm();
    // this.route.queryParamMap.subscribe(params =>{
    //   setTimeout(() => {
    //     this.getSoWDetails(params)
    //   }, 100);
    // }
      
    // );
   
  }
  getSoWDetails(params:any){
    this.editSowService.getSoWDetails(params.params.sow).subscribe(res=>{
      this.formReady=true;
      this.editDetails=res.data;
      this.sowEditForm.patchValue(this.convertResponse(res.data))
    });
  }
  updateSow(){
    if(this.sowEditForm.status=="INVALID") return;   
    this.editSowService.updateSoW(this.createRequestObject(this.sowEditForm.value)).subscribe(response=>{
      this.openDialog(response.data)
      // this.router.navigate(['/reviewSOW']);
    })
  }
  openDialog(msg:string): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '400px',
      data: { message: msg,sow:this.editDetails.soWPattern}

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  
  getBUOptions(): void {
    this.dashboardService.getBUValues()
      .subscribe(response => {
        this.posts = response.data;
        this.route.queryParamMap.subscribe(params =>{
          setTimeout(() => {
            this.getSoWDetails(params)
          }, 100);
        }
          
        );
      });
  }
  getOnshoreDMList() {
    this.editSowService.getOnshoreDMs()
      .subscribe(response => {
        this.onshoreDMOptions = response.data;
      });
  }

  getOffshoreDMList() {
    this.editSowService.getOffshoreDMs()
      .subscribe(response => {
        this.offshoreDMOptions = response.data;
      });
  }
  getCIOOptions(value: any) {
    this.cioValues=null;
    this.dashboardService.getCIOValues(value)
      .subscribe(response => {
        this.cioValues = response.data;
        let cio=this.cioValues.filter((data:any)=>{return data.cioName==this.editDetails?.cio})[0]?.cioId
        this.sowEditForm.controls['CIO'].patchValue(cio)
        this.getChubbManagerOptions(cio)
        
      });
  }
  getChubbManagerOptions(value: any) {
    this.dashboardService.getChubbManagerValues(value)
      .subscribe(response => {
        this.chubbValues = response.data;

        let cbm=this.chubbValues.filter((data:any)=>{return data.chubbManagerName==this.editDetails?.chubbManager})[0]?.chubbManagerId
        this.sowEditForm.controls['ChubbManager'].patchValue(cbm)
      });
  }
  navigateTochooseSOW() {
    this.router.navigate(['/chooseSOW']);
  }
  goToDashboard() {
    this.router.navigate([('/')]);
  }
  createSowEditForm(){
    this.sowEditForm = new FormGroup({
      OriginalSoWPattern: new FormControl(null,[Validators.required]),
      SoWCRPattern: new FormControl( null,[Validators.required]),
      Description: new FormControl(null,[Validators.required]),
      BusinessUnit: new FormControl(null,[Validators.required]),
      CIO: new FormControl(null,[Validators.required]),
      ChubbManager: new FormControl(null,[Validators.required]),
      Status: new FormControl(null,[Validators.required]),
      CreationTimeLine: new FormControl(null,[Validators.required]),
      UpdationTimeLine: new FormControl(null,[Validators.required]),
      ApprovalTimeLine: new FormControl(null,[Validators.required]),
      RenewalFrequency: new FormControl(null),
      StartDate: new FormControl(null,[Validators.required]),
      EndDate: new FormControl(null,[Validators.required]),
      TCV: new FormControl(null,[Validators.required]),
      Value: new FormControl(null,[Validators.required]),
      ILC: new FormControl(null,[Validators.required]),
      IBMOnShoreDM: new FormControl(null,[Validators.required]),
      IBMOffShoreDM: new FormControl(null,[Validators.required]),
      ContractType1: new FormControl(null,[Validators.required]),
      ContractType2: new FormControl(null,[Validators.required]),
      PricingFinalized: new FormControl(null,[Validators.required]),
      DCAApprovalDone: new FormControl(null,[Validators.required]),
      ContractRegDone: new FormControl(null,[Validators.required]),
      StaffingComplete: new FormControl(null,[Validators.required]),
      PlannedGP: new FormControl(null,[Validators.required]),
     // ActualGP: new FormControl(null,[Validators.required]),
      Stage: new FormControl(null,[Validators.required]),
      FromIBS: new FormControl(null,[Validators.required]),
      SalesConnect: new FormControl(null,[Validators.required]),
      DateSubmissionSigning: new FormControl(null,[Validators.required]),
      SignDateIfSigned: new FormControl(null,[Validators.required]),
      OpportunityID: new FormControl(null,[Validators.required]),
      Remarks: new FormControl(null,[Validators.required]),
        })
  }
  createRequestObject(formData:any){
    let data=JSON.parse(JSON.stringify(formData))
    data.CreationTimeLine=this.formatDate(data.CreationTimeLine)
    data.UpdationTimeLine=this.formatDate(data.UpdationTimeLine)
    data.ApprovalTimeLine=this.formatDate(data.ApprovalTimeLine)
    data.StartDate=this.formatDate(data.StartDate)
    data.EndDate=this.formatDate(data.EndDate)
    data.DateSubmissionSigning=this.formatDate(data.DateSubmissionSigning)
    data.SignDateIfSigned=this.formatDate(data.SignDateIfSigned)
    console.log(data,"edit form is ")
    delete data.OriginalSoWPattern
    delete data.SoWCRPattern
    return {
     ...data,
      "soWID" : this.editDetails?.soWID,
      "UpdatedBy":"Kota.Malli.Kishore@ibm.com"
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

    return [year, month, day].join('-');
}
  convertResponse(res:any){
    return {
      OriginalSoWPattern: res.originalSoWPattern,
      SoWCRPattern: res.soWPattern,
      Description: res.description,
      BusinessUnit: this.getBUCode(res.businessUnit),
      CIO: null,
      ChubbManager: null,
      Status: res.status,
      CreationTimeLine: res.creationTimeLine,
      UpdationTimeLine: res.updationTimeLine,
      ApprovalTimeLine: res.approvalTimeLine,
      RenewalFrequency: res.renewalFrequency,
      StartDate: res.startDate,
      EndDate: res.endDate,
      TCV: res.tcv,
      Value: res.value,
      ILC: res.ilc,
      IBMOnShoreDM: this.getOnshoreDMCode(res.ibmOnShoreDM),
      IBMOffShoreDM:this.getOffshoreDMCode(res.ibmOffShoreDM),
      ContractType1: res.contractType1,
      ContractType2: res.contractType2,
      PricingFinalized: res.pricingFinalized.trim(),
      DCAApprovalDone: res.dcaApprovalDone,
      ContractRegDone: res.contractRegDone,
      StaffingComplete: res.staffingComplete.trim(),
      PlannedGP: res.plannedGP,
      //ActualGP: res.actualGP,
      Stage: res.stage,
      FromIBS: res.fromIBS,
      SalesConnect: res.salesConnect,
      DateSubmissionSigning: res.dateSubmissionSigning,
      SignDateIfSigned: res.signDateIfSigned,
      OpportunityID: res.opportunityID,
      Remarks: res.remarks,
    }
  }
  getBUCode(value:string){
    let code="";
    code= this.posts.filter((data:any)=>{return data.businessUnitName==value})[0].businessUnitId;
    this.getCIOOptions(code)
    return code;
  }
  getOnshoreDMCode(value:string){
    for(let i=0;i<this.onshoreDMOptions.length;i++){
      if(this.onshoreDMOptions[i].onShoreDMName === value){
        return this.onshoreDMOptions[i].onshoreDMId 
      }
    }
    return '';
  }
  getOffshoreDMCode(value:string){
    for(let i=0;i<this.offshoreDMOptions.length;i++){
      if(this.offshoreDMOptions[i].offShoreDMName === value){
        return this.offshoreDMOptions[i].offshoreDMId 
      }
    }
    return '';    
  }


  
  checkPercentagePattern(event:any) {
    if(event.key=='Backspace' || event.key=='Enter' || event.key=='Tab') return ; 
    let regEx1 = /[0-9.]/;
    if(!regEx1.test(event.key)){
      event.preventDefault();
      return;
    }
      let val=event.target.value;
      let len = val.length;
      let i=val.indexOf('.'); 
      if(i!=-1 && event.key=='.'){
        event.preventDefault();
        return;
      }
      if(len==2 && event.key!='.' && i==-1){
        event.preventDefault();
        return;
      }           
      if(i!=-1 && (len-i)==3){
         event.preventDefault();
      }
  
  
  }
}



