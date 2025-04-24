import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SurveyCreatorModule } from 'survey-creator-angular';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HttpClientModule, // Add HttpClientModule
    SurveyCreatorModule // Add SurveyCreatorModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Get Started with SurveyJS Form Library for Angular';

}
