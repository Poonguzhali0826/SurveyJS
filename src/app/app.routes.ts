import { Routes } from '@angular/router';
import { EnquiryListComponent } from './enquiry-list/enquiry-list.component';
import { SurveyComponent } from './survey/survey.component';
import { ViewDetailsComponent } from './view-details/view-details.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'enquiries-list',
        pathMatch: 'full'
      },
      {
        path: 'enquiries-list',
        component: EnquiryListComponent
      },
      {
        path: 'survey',
        component: SurveyComponent
      },
      {
        path: 'view-details',
        component: ViewDetailsComponent
      }
];
