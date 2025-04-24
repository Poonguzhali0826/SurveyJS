import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SurveyCreatorModel } from 'survey-creator-core'; // Core model
import { SurveyCreatorModule } from 'survey-creator-angular';
import "survey-core/survey-core.min.css";
import "survey-creator-core/survey-creator-core.min.css";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-survey-creator-page',
  standalone: true,
  imports: [
    HttpClientModule, // Add HttpClientModule
    SurveyCreatorModule,
  CommonModule],
  templateUrl: './survey-creator-page.component.html',
  styleUrl: './survey-creator-page.component.scss'
})
export class SurveyCreatorPageComponent implements OnInit {
  surveyCreatorModel!: SurveyCreatorModel;
  backendApiUrl = 'http://localhost:3000/api/createSurvey';
  surveyId!: any;
  
  constructor(
    private http: HttpClient, 
    private router: Router
  ) { }
  ngOnInit() {
    const creatorOptions = {
      showLogicTab: true, // Show the Logic tab
      showTranslationTab: true, // Show the Translation tab
      isAutoSave: false  // Set to true for auto-saving drafts (more complex setup needed)
      // Add other options as needed: https://surveyjs.io/survey-creator/documentation/surveycreator#options
    };
    this.surveyCreatorModel = new SurveyCreatorModel(creatorOptions);
    console.log('surveyCreatorModel', this.surveyCreatorModel.JSON)
    // Load the survey after the model is initialized
    this.loadSavedSurvey();

    // --- THIS IS THE KEY PART for saving ---
    // This function will be called when the user clicks the 'Save Survey' button in the Creator UI

    this.surveyCreatorModel.saveSurveyFunc = (saveNo: number, callback: (saveNo: number, success: boolean, error?: any) => void) => {
      console.log('Save button clicked. JSON:', this.surveyCreatorModel.JSON);
      const surveyJsonPayload = {
        surveyJson: this.surveyCreatorModel.JSON
      }

      if (localStorage.getItem('surveyId')) {
        this.http.put<{ message: string, surveyId: string }>(`${this.backendApiUrl}/${localStorage.getItem('surveyId')}`, surveyJsonPayload).subscribe({
          next: (response) => {
            alert(`Survey updated successfully! ID: ${response.surveyId}`);
          },
          error: (error) => {
            alert(`Error updating survey: ${error.message}`);
          }
        });
      }else {
        // Send the JSON to your Node.js backend
        this.http.post<{ message: string, surveyId: string }>(this.backendApiUrl, surveyJsonPayload).subscribe({
          next: (response) => {
            console.log('Survey saved successfully on backend:', response);
            // Tell Survey Creator the save was successful
            if (response.surveyId) {
              this.surveyId = response.surveyId; // Store the survey ID for later use
              console.log('Survey saved with ID:', this.surveyId);
              // Save surveyId to localStorage
              localStorage.setItem('surveyId', this.surveyId);
              // Fetch the saved survey JSON when the component is initialized
              this.loadSavedSurvey();
            }
            callback(saveNo, true);
            alert(`Survey saved successfully! ID: ${response.surveyId}`);
            // Optionally, you could load the saved survey back into the creator
            // Or navigate away, etc.
          },
          error: (error) => {
            console.error('Error saving survey:', error);
            // Tell Survey Creator the save failed
            callback(saveNo, false, error);
            alert(`Error saving survey: ${error.message || 'Check console for details.'}`);
          }
        });
      }
     
    }
    
  }
  // Function to load the saved survey from the backend
loadSavedSurvey() {
  const surveyId = localStorage.getItem('surveyId'); // Replace with the actual survey ID if necessary
  if (surveyId) {
    this.http.get<{ surveyJson: any }>(`${this.backendApiUrl}/${surveyId}`).subscribe({
      next: (response) => {
        if (response.surveyJson) {
          console.log('Survey loaded from backend:', response.surveyJson);
          this.surveyCreatorModel.JSON = response.surveyJson.surveyJson; // Set the loaded JSON into the creator
          console.log('surveyCreatorModel after load:', this.surveyCreatorModel.JSON);
        } else {
          console.log('No saved survey found');
        }
      },
      error: (error) => {
        console.error('Error loading saved survey:', error);
        alert(`Error loading survey: ${error.message || 'Check console for details.'}`);
      }
    });
  } else {
    console.log('No surveyId available to load');
  }
}
startEnquiry() {
  this.router.navigate(['/enquiry-form']);
}

}
