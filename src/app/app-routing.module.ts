import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { ChooseSowComponent } from './choose-sow/choose-sow.component';
import { CreateSOWComponent } from './create-sow/create-sow.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditsowComponent } from './editsow/editsow.component';
import { ReviewSoWComponent } from './review-so-w/review-so-w.component';
import { SowTrackerComponent } from './sow-tracker/sow-tracker.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [MsalGuard]
 },
  { path: 'chooseSOW', component: ChooseSowComponent },
  { path: 'createSOW', component: CreateSOWComponent },
  { path: 'sowTracker', component: SowTrackerComponent },
  { path: 'editSOW', component: EditsowComponent },
  { path: 'reviewSOW', component: ReviewSoWComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      relativeLinkResolution: 'corrected',
      initialNavigation: 'enabledBlocking',
      useHash: true
  }
   )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
