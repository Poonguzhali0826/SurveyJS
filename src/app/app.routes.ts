import { Routes } from '@angular/router';
import { EnquiryListComponent } from './enquiry-list/enquiry-list.component';
import { SurveyComponent } from './survey/survey.component';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { SurveyCreatorPageComponent } from './survey-creator-page/survey-creator-page.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'survey-creator-page',
        pathMatch: 'full'
      },
      
      {
        path: 'enquiries-list',
        component: EnquiryListComponent
      },
      {
        path: 'enquiry-form',
        component: SurveyComponent
      },
      {
        path: 'view-details',
        component: ViewDetailsComponent
      },
      {
        path: 'survey-creator-page',
        component: SurveyCreatorPageComponent
      }
];
