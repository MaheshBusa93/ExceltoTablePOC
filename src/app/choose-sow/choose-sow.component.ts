import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChooseSowService } from './choose-sow.service';
import {Store} from '@ngrx/store';
import { FormGroup, FormControl } from '@angular/forms';
import { getChoosenSOW } from '../Sow-store/actions/sow-action';
import { ObserversModule } from '@angular/cdk/observers';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-choose-sow',
  templateUrl: './choose-sow.component.html',
  styleUrls: ['./choose-sow.component.scss']
})
export class ChooseSowComponent implements OnInit {

  constructor(private router: Router,
    private chooseSowService:ChooseSowService,
    private store:Store) { }
  buttonDisabled:boolean=true;
  sowType:string='OR';
  years:any[]=[];
  originalSow:any[]=[];
  generatedSOWCR:any;
  generatedOriginalSOW:any;
  isDisabled:boolean=true;
  chooseSowForm = new FormGroup({
    region: new FormControl(),
    year: new FormControl(),
    originalSow: new FormControl(),
    sow: new FormControl()
  })
  ngOnInit(): void {
    this.getYears();
    this.getOriginalSow();
    this.chooseSowForm.controls['region'].valueChanges.subscribe(data=>{
      setTimeout(() => {
        this.enableSubmitButton();
      }, 100);
     
    })
    this.chooseSowForm.controls['year'].valueChanges.subscribe(data=>{
      setTimeout(() => {
        this.enableSubmitButton();
      }, 100);
     
     })
     this.chooseSowForm.controls['originalSow'].valueChanges.subscribe(data=>{
      setTimeout(() => {
        this.enableSubmitButton();
      }, 100);
     
     })
  }
 
  enableSubmitButton(){
    this.buttonDisabled=true;
    if((this.chooseSowForm.value.region!=null && this.chooseSowForm.value.year!=null ) && this.sowType==='OR')
    this.buttonDisabled=false;
    if(this.chooseSowForm.value.originalSow!=null  && this.sowType==='CR')
    this.buttonDisabled=false;
  }
  navigateTocreateSOW() {
    let choosenSow=null;
    console.log(this.chooseSowForm)
    if(this.sowType=='OR'){
      if(!(this.chooseSowForm.value.region==null ||this.chooseSowForm.value.year==null)){
        this.generateOriginalSOW(this.chooseSowForm.value.region,this.chooseSowForm.value.year).subscribe(res=>{
          choosenSow={
            region:this.chooseSowForm.value.region,
            year:this.chooseSowForm.value.year,
            originalSow:res.data,
            sow:res.data,
            sowType:'OR',
            sowCRNo:0
          }
          this.store.dispatch(getChoosenSOW(choosenSow))
          this.router.navigate(['/createSOW']);
        });  
      }
      
      
      
      
     
    }else if(this.sowType=='CR'){
      choosenSow={
        region:null,
        year:null,
        originalSow:this.chooseSowForm.value.originalSow,
        sow:this.chooseSowForm.value.sow,
        sowType:'CR',
        sowCRNo:this.generatedSOWCR.soWCRNo
      }
      this.store.dispatch(getChoosenSOW(choosenSow))
      this.router.navigate(['/createSOW']);

      

    }

    
  }
  navigateTosearcheSOW() {
    this.router.navigate(['/']);
  }
  radioChange(event:any){
  this.sowType=event.value;
 (event.value=="CR")?this.isDisabled=false:this.isDisabled=true;
 this.enableSubmitButton();
  }

  getYears(): void {
    this.chooseSowService.getYears()
      .subscribe(response => {
       this.years=response.data;
      });
  }
  getOriginalSow(): void {
    this.chooseSowService.getOriginalSow()
      .subscribe(response => {
        this.originalSow=response.data;
      });
  }

  generateSOWCR(sow:any){
    this.chooseSowService.generateSOWCR(sow)
    .subscribe(response => {
     this.generatedSOWCR=response.data;
     this.chooseSowForm.controls.sow.patchValue(this.generatedSOWCR.soWCRName);
    });
  }
  generateOriginalSOW(region:any,year:any):Observable<any>{
    this.generatedOriginalSOW=null;
    return this.chooseSowService.generateOriginalSOW(region,year)
  }

}
