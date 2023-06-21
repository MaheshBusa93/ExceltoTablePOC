import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CellClassRules, CellClickedEvent, ColDef, GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import 'ag-grid-enterprise';
import { DashboardService } from './dashboard.service';
import { FormGroup, FormControl } from '@angular/forms';
import { FocusMonitor } from '@angular/cdk/a11y';
import { MatRadioChange } from '@angular/material/radio';
import { MatInput } from '@angular/material/input';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dashboardForm = new FormGroup({
    businessUnitValue: new FormControl(''),
    cioValue: new FormControl(''),
    chubbMgrValue: new FormControl(''),
    sowNoValue: new FormControl('')
  });
  buttonDisabled: boolean = true;
  isDisabled: boolean = true;
  paginationPageSize: any;
  posts: any;
  cioValues: any;
  gridOptions: GridOptions;
  groupSelected: any;
  gridApi: GridApi;
  startDate: any;
  formattedstartDate: string;
  endDate: any;
  formattedendDate: string;
  rowDataObj: any;
  rowDataArr: any = [];
  sowNumber: any;
  sowNumberModel: any;
  sowValue: any;
  searchValue: any;
  buModel: string;
  cioModel: string;
  chubbMgrModel: string;

  private getColDefs(): ColDef[] {
    return [{
      headerName: "SoW No.", field: 'soWPattern', sortable: true, unSortIcon: true, resizable: true,
      width: 400, cellRenderer: 'agGroupCellRenderer', cellStyle: { color: '#0F62FE' }
    },
    { headerName: "Business Unit", sortable: true, field: 'businessUnit', unSortIcon: true, resizable: true },
    { headerName: "CIO", sortable: true, field: 'cio', unSortIcon: true, resizable: true },
    {
      headerName: "Stage", sortable: true, field: 'stage', unSortIcon: true, resizable: true,
      cellStyle: params => {
        if (params.value === 'Close') {
          return {
            background: '#D7D7D7',
            opacity: 1
          };
        }
        if (params.value === 'Negotiate') {
          return {
            background: '#7ACB004D',
            opacity: 1
          };
        }
        if (params.value === 'Propose') {
          return {
            background: '#0F62FE33',
            opacity: 1
          };
        }
        if (params.value === 'Open') {
          return {
            background: '#E419134D',
            opacity: 1
          };
        }
        return null;
      }
    },
    { headerName: "Start Date", sortable: true, field: 'startDate', unSortIcon: true, resizable: true },
    { headerName: "End Date", sortable: true, field: 'endDate', unSortIcon: true, resizable: true }];
  }

  rowData = [];
  result: any;
  chubbValues: any;
  buId: any;
  cioId: any;
  chubbMgrId: any;
  msisdn: any;
  constructor(private router: Router, private dashboardService: DashboardService) {
    this.gridOptions = {
      columnDefs: this.getColDefs(),

      rowData: [],
    };
  }

  ngOnInit(): void {
    this.getBUOptions();
  }

  onCellClicked(event: CellClickedEvent) {
    console.log("event", event.value);
    this.sowValue = event.value;
    if (event.colDef.field == "soWPattern") {
      this.router.navigate(['/sowTracker'], { queryParams: { category: this.sowValue } });
    }

  }

  navigateTochooseSOW() {
    this.router.navigate(['/chooseSOW']);
  }
  searchBySoWNoCheckBox(event: any) {
    this.isDisabled = !this.isDisabled;
    console.log("event", event.checked)
    if (event.checked == false) {
      console.log(this.searchValue);
      this.msisdn = "";
      this.buttonDisabled = true;
    } else if (event.checked == true) {
      this.buModel = "";
      this.cioModel = "";
      this.chubbMgrModel = "";
    }
  }
  getBUOptions(): void {
    this.dashboardService.getBUValues()
      .subscribe(response => {
        this.posts = response.data;

      });
  }
  getCIOOptions(buId: any) {
    this.buId = buId;
    if (this.buId || this.cioId || this.chubbMgrId) {
      this.buttonDisabled = false;
    }
    this.dashboardService.getCIOValues(buId)
      .subscribe(response => {
        this.cioValues = response.data;

      });
  }
  getChubbManagerOptions(cioId: any) {
    this.cioId = cioId;
    this.dashboardService.getChubbManagerValues(cioId)
      .subscribe(response => {
        this.chubbValues = response.data;
      });
  }
  detailCellRendererParams = {
    // provide the Grid Options to use on the Detail Grid
    detailGridOptions: {
      columnDefs: [
        { headerName: 'Renewal Frequency', field: 'renewalRrequency', width: 204, menuTabs: [] },
        { headerName: 'IBM Onshore DM', field: 'IBMonshoreDM', width: 156, menuTabs: [] },
        { headerName: 'IBM Offshore DM', field: 'IBMoffshoreDM', width: 137, menuTabs: [] },
        { headerName: 'Original SoW', field: 'originalSoW', width: 300, menuTabs: [] }
      ]
    },
    // get the rows for each Detail Grid
    getDetailRowData: (params: any) => {
      params.successCallback(params.data.details);
    }
  };
  getChubbManagerID(value: any) {
    this.chubbMgrId = value;
  }
  onSearchChange(event: any): void {
    console.log(event);
    this.searchValue = (event.target as HTMLInputElement).value;
    console.log(this.searchValue);
    if (this.searchValue) {
      this.buttonDisabled = false;
    } else {
      this.buttonDisabled = true;
    }
  }

  getGridDetails() {
    let req = {
      "BusinessUnitId": this.buId ? this.buId : 0,
      "CIOId": this.cioId ? this.cioId : 0,
      "ChubbManagerId": this.chubbMgrId ? this.chubbMgrId : 0,
      "SOWNumber": this.msisdn ? this.msisdn : "",
      "StartDate": "",
      "EndDate": "",
      "RenewalFrequency": "",
      "IBMOnShoreDM": "",
      "IBMOffShoreDM": "",
      "OriginalSoW": "",
      "Status": "",
      "Filter": this.groupSelected ? this.groupSelected : "ALL",
      "Value": ""
    }
    this.dashboardService.gridDetailsService(req)
      .subscribe(response => {
        this.rowDataArr = [];

        if (Array.isArray(response.data) && response.data.length > 0) {
          for (let i = 0; i < response.data.length; i++) {
            if (response.data[i] && response.data[i].startDate) {
              this.startDate = response.data[i].startDate.split("T")[0].split("-");
              this.formattedstartDate = this.startDate[1] + "/" + this.startDate[2] + "/" + this.startDate[0];
            }

            if (response.data[i] && response.data[i].endDate) {
              this.endDate = response.data[i].endDate.split("T")[0].split("-");
              this.formattedendDate = this.endDate[1] + "/" + this.endDate[2] + "/" + this.endDate[0];
            }
            this.rowDataObj = {
              soWPattern: response.data[i]?.soWPattern,
              businessUnit: response.data[i]?.businessUnit,
              cio: response.data[i]?.cio,
              stage: response.data[i]?.stage,
              startDate: this.formattedstartDate,
              endDate: this.formattedendDate,
              details:[{
                renewalRrequency:response.data[i]?.renewalFrequency,
                IBMonshoreDM:response.data[i]?.ibmOnShoreDM ,
                IBMoffshoreDM: response.data[i]?.ibmOffShoreDM,
                originalSoW: response.data[i]?.originalSoW
              }]
            }
            this.rowDataArr.push(this.rowDataObj);
            
          }
          this.rowData = this.rowDataArr;
        } else {
          this.rowData = [];
        }
      })
  }
  getSoWNo() {

  }
  radioChange($event: MatRadioChange) {
    this.groupSelected = $event.value
    this.getGridDetails();
  }
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    params.api.sizeColumnsToFit(); 
    //params.columnApi.autoSizeAllColumns();
  }
  
  onBtnExport() {
   // this.gridApi.exportDataAsExcel();
   let req = {
    "BusinessUnitId": this.buId ? this.buId : 0,
    "CIOId": this.cioId ? this.cioId : 0,
    "ChubbManagerId": this.chubbMgrId ? this.chubbMgrId : 0,
    "SOWNumber": this.msisdn ? this.msisdn : "",
    "StartDate": "",
    "EndDate": "",
    "RenewalFrequency": "",
    "IBMOnShoreDM": "",
    "IBMOffShoreDM": "",
    "OriginalSoW": "",
    "Status": "",
    "Filter": this.groupSelected ? this.groupSelected : "ALL",
    "Value": ""
  }
   this.dashboardService.gridDetailsService(req)
   .subscribe(response => {
    console.log("response", response);
    this.dashboardService.exportAsExcelFile(response.data, "SoWInformation")  
   })
  }
  valuechange($event: any) {

    console.log($event.target.value)
  }
  onSubmit() {
    // TODO: Use EventEmitter with form value

  }
  resetForm() {
    this.dashboardForm.reset();
    this.buttonDisabled = true;
  }
}
