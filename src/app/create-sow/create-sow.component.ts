import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DashboardService } from '../dashboard/dashboard.service';
import { CreatesowService } from './createsow.service';
import {Store} from '@ngrx/store';
import { selectSow } from '../Sow-store/selectors/sow-selector';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-create-sow',
  templateUrl: './create-sow.component.html',
  styleUrls: ['./create-sow.component.scss']
})
export class CreateSOWComponent implements OnInit {
  posts: any;
  cioValues: any;
  chubbValues: any;
  onshoreDMOptions: any;
  offshoreDMOptions: any;
  
  formReady:boolean=false
  sowForm:any;


  region:string='';
  year:any;
  originalSow:string='';
  sow:string='';
  sowType:string='';
  sowCRNo:any;

  constructor(private router: Router,
    private dashboardService: DashboardService, private createSoWService: CreatesowService,
    private spinner: NgxSpinnerService,
    private store:Store
  ) { }

  


  ngOnInit(): void {
    this.getBUOptions();
    this.getOnshoreDMList();
    this.getOffshoreDMList();
    this.store.select(selectSow).subscribe(res=>{
      this.createSoWService.setOriginalSoWNumber(res.sow);
      this.region=res.region;
      this.year=res.year;
      this.originalSow=res.originalSow;
      this.sow=res.sow;
      this.sowType=res.sowType;
      this.sowCRNo=res.sowCRNo;
      this.createSowForm();
      this.formReady=true;
    })
  }
  navigateTosowReview() {
    if(this.sowForm.status=="INVALID") return;
    this.createSoWService.addNewSOW(this.createRequestObject(this.sowForm.value)).subscribe(response=>{
      this.router.navigate(['/reviewSOW'], { queryParams: { category: response.data } } );
    })
   
  }
  getBUOptions(): void {
    this.dashboardService.getBUValues()
      .subscribe(response => {
        this.posts = response.data;
      });
  }
  getOnshoreDMList() {
    this.createSoWService.getOnshoreDMs()
      .subscribe(response => {
        this.onshoreDMOptions = response.data;
      });
  }

  getOffshoreDMList() {
    this.createSoWService.getOffshoreDMs()
      .subscribe(response => {
        this.offshoreDMOptions = response.data;
      });
  }
  getCIOOptions(value: any) {
    this.dashboardService.getCIOValues(value)
      .subscribe(response => {
        this.cioValues = response.data;
      });
  }
  getChubbManagerOptions(value: any) {
    this.dashboardService.getChubbManagerValues(value)
      .subscribe(response => {
        this.chubbValues = response.data;

      });
  }

  navigateToSearchSoW() {
    this.router.navigate(['/']);
  }
  
  createRequestObject(formData:any){
    let data=JSON.parse(JSON.stringify(formData))
    data.CreationTimeLine=this.formatDate(data.CreationTimeLine)
    data.UpdationTimeLine=this.formatDate(data.UpdationTimeLine)
    data.ApprovalTimeLine=this.formatDate(data.ApprovalTimeLine)
    data.StartDate=this.formatDate(data.StartDate)
    data.EndDate=this.formatDate(data.EndDate)
    data.DateSubmissionSigning=this.formatDate(data.DateSubmissionSigning)
    data.SignDateIfSigned=data.SignDateIfSigned?this.formatDate(data.SignDateIfSigned):''
    return{
     ...data,
      "SoWCRId" : this.sowCRNo?this.sowCRNo:0,
      "SoWType" : this.sowType,
      "CreatedBy":"Kota.Malli.Kishore@ibm.com"
    }
     
  }
  createSowForm(){
    this.sowForm = new FormGroup({
      OriginalSoWPattern: new FormControl(this.originalSow, [Validators.required]),
      SoWCRPattern: new FormControl(this.sow, [Validators.required]),
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
      SalesConnectOpportunityId: new FormControl(null,[Validators.required]),
      DateSubmissionSigning: new FormControl(null,[Validators.required]),
      SignDateIfSigned: new FormControl(null),
      Remarks: new FormControl(null,[Validators.required]),
        })
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



