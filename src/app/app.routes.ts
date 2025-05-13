import { Routes } from '@angular/router';
import { EnquiryListComponent } from './enquiry-list/enquiry-list.component';
import { SurveyComponent } from './survey/survey.component';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { SurveyCreatorPageComponent } from './survey-creator-page/survey-creator-page.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';

export const routes: Routes = [
  { path: 'login', 
   loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
  },
  { path: 'signup', 
    loadComponent: () => import('./pages/signup/signup.component').then(m => m.SignupComponent)
  },
  { path: '', 
    redirectTo: '/login', 
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
