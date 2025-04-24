import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Model } from "survey-core";
import { SurveyModule } from 'survey-angular-ui';
import "survey-core/survey-core.css";
import { HttpClient, HttpClientModule  } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-survey',
  standalone: true,
  imports: [
    SurveyModule, 
    CommonModule, 
    HttpClientModule,
    MatStepperModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './survey.component.html',
  styleUrl: './survey.component.scss'
})
export class SurveyComponent implements OnInit {
  title = 'My First Survey';
  stepIcons = ['phone', 'chat', 'done', 'event', 'business'];
  // surveyJson = {
  //   "pages": [
  //   {
  //     "name": "clientInfo",
  //     "title": "Client Info",
  //     "elements": [
  //       { "type": "text", "name": "clientName", "title": "May I have your name?", "isRequired": true },
  //       { "type": "text", "name": "companyName", "title": "Company or brand name (if applicable)" },
  //       { "type": "text", "name": "email", "title": "What’s the best email to reach you at?", "isRequired": true },
  //       { "type": "text", "name": "phone", "title": "Can I get your phone number?", "isRequired": true },
  //       { "type": "text", "name": "location", "title": "Where are you located?", "isRequired": true },
  //       {
  //         "type": "radiogroup",
  //         "name": "contactMethod",
  //         "title": "How do you prefer we contact you?",
  //         "choices": ["Phone", "Email", "WhatsApp"]
  //       }
  //     ]
  //   },
  //   {
  //     "name": "orderDetails",
  //     "title": "Order Details",
  //     "elements": [
  //       {
  //         "type": "dropdown",
  //         "name": "garmentType",
  //         "title": "What type of garments are you looking for?",
  //         "choices": ["T-shirt", "Polo", "Hoodie", "Cap", "Tote Bag", "Other"], "isRequired": true
  //       },
  //       {
  //         "type": "text",
  //         "name": "quantity",
  //         "title": "What is the total quantity you need?", "isRequired": true
  //       },
  //       {
  //         "type": "text",
  //         "name": "sizes",
  //         "title": "Size breakdown (e.g., 10-S, 15-M, 5-L)", "isRequired": true
  //       },
  //       {
  //         "type": "text",
  //         "name": "colors",
  //         "title": "What garment colors do you need?", "isRequired": true
  //       },
  //       {
  //         "type": "dropdown",
  //         "name": "fabricType",
  //         "title": "Do you have a fabric preference?",
  //         "choices": ["Cotton", "Dry Fit", "Blended", "No preference"], "isRequired": true
  //       }
  //     ]
  //   },
  //   {
  //     "name": "designPrinting",
  //     "title": "Design & Printing Requirements",
  //     "elements": [
  //       {
  //         "type": "dropdown",
  //         "name": "hasDesign",
  //         "title": "Do you already have a logo/design?",
  //         "choices": ["Yes", "No", "Need design assistance"]
  //       },
  //       {
  //         "type": "checkbox",
  //         "name": "fileFormats",
  //         "title": "What file format is it in?",
  //         "visibleIf": "{hasDesign} = 'Yes'",
  //         "choices": ["PNG", "AI", "EPS", "PDF", "JPG"]
  //       },
  //       {
  //         "type": "dropdown",
  //         "name": "needDesignHelp",
  //         "title": "Would you like our design team to help you create one?",
  //         "visibleIf": "{hasDesign} != 'Yes'",
  //         "choices": ["Yes", "No"]
  //       },
  //       {
  //         "type": "dropdown",
  //         "name": "printType",
  //         "title": "What type of printing or embroidery do you need?",
  //         "choices": ["Embroidery", "Screen Print", "DTF", "Vinyl", "Not sure"], "isRequired": true
  //       },
  //       {
  //         "type": "text",
  //         "name": "embroiderySize",
  //         "title": "What’s the approximate embroidery size? (e.g., 3\" x 3\" chest logo)",
  //         "visibleIf": "{printType} = 'Embroidery'"
  //       },
  //       {
  //         "type": "checkbox",
  //         "name": "printLocations",
  //         "title": "How many print locations do you need?",
  //         "visibleIf": "{printType} = 'Embroidery'",
  //         "choices": ["Front", "Back", "Sleeve", "All"]
  //       },
  //       {
  //         "type": "text",
  //         "name": "designColors",
  //         "title": "How many colors are in the design?",
  //         "visibleIf": "{printType} = 'Embroidery'"
  //       }
  //     ]
  //   },
  //   {
  //     "name": "timelineLogistics",
  //     "title": "Timeline & Logistics",
  //     "elements": [
  //       {
  //         "type": "text",
  //         "name": "eventDeadline",
  //         "title": "Is there a specific deadline or event date you need this for?",
  //         "inputType": "date"
  //       },
  //       {
  //         "type": "radiogroup",
  //         "name": "requireShipping",
  //         "title": "Will you require shipping?",
  //         "choices": ["Yes", "No / Local"]
  //       },
  //       {
  //         "type": "text",
  //         "name": "shippingAddress",
  //         "title": "Can I get your delivery address?",
  //         "visibleIf": "{requireShipping} = 'Yes'", "isRequired": true
  //       },
  //       {
  //         "type": "radiogroup",
  //         "name": "pickupPreference",
  //         "title": "Would you prefer to pick up the order?",
  //         "visibleIf": "{requireShipping} = 'No / Local'",
  //         "choices": ["Yes", "No"]
  //       }
  //     ]
  //   },
  //   {
  //     "name": "businessSales",
  //     "title": "Business & Sales",
  //     "elements": [
  //       {
  //         "type": "text",
  //         "name": "estimatedBudget",
  //         "title": "Do you have an estimated budget for this order?"
  //       },
  //       {
  //         "type": "comment",
  //         "name": "specialInstructions",
  //         "title": "Do you have any special instructions? (e.g., tag removal, packaging, labeling)"
  //       },
  //       {
  //         "type": "text",
  //         "name": "followUpTime",
  //         "title": "When would you like us to follow up with you?"
  //       },
  //       {
  //         "type": "text",
  //         "name": "assignedSalesRep",
  //         "title": "Which sales rep is assigned to this lead?"
  //       }
  //     ]
  //   }
  // ]
  // };
  surveyModel!: Model;
  currentPageIndex = 0;
  pageTitles: string[] = [];
  surveyJson: any;
  // surveyJson: any[] =[];

  constructor(
    private http: HttpClient, 
    private router: Router, 
    private cdr: ChangeDetectorRef
  ) {
    // this.surveyModel.onCurrentPageChanged.add((sender) => {
    //   this.currentPageIndex = sender.currentPageNo;
    // });
  }
  alertResults (sender: Model) {
    const results = sender.data;
    console.log('survey results:', results);
    const payload = {
      ...results,
      surveyCreatedUsing: "Form"
    };
    console.log('payload', payload);

    this.http.post('http://localhost:3000/api/survey', payload).subscribe({
      next: (response) => {
        console.log("Data sent to backend:", response);
      },
      error: (err) => {
        console.error("Failed to send data:", err);
      }
    });
    this.router.navigate(['/enquiries-list']);

  }
  ngOnInit() {
      this.http.get<any[]>('http://localhost:3000/api/createSurvey').subscribe(data => {
        console.log('dynamic questins reponse', data);
        this.surveyJson = data[0].data.surveyJson;
        console.log('this.surveyJson', this.surveyJson);
        if (this.surveyJson && Array.isArray(this.surveyJson.pages)) {
          this.pageTitles = this.surveyJson.pages.map((page: any) => page.title);
          console.log('Page Titles:', this.pageTitles); // Log the page titles
          console.log('Pages:', this.surveyJson.pages);
        } else {
          console.error('Pages data is missing or not in the expected format');
        }
        const survey = new Model(this.surveyJson);
        this.surveyModel = survey;
        this.surveyModel.onCurrentPageChanged.add((sender) => {
          this.currentPageIndex = sender.currentPageNo;
          this.cdr.detectChanges();
        });
      
        // Handle survey complete
        this.surveyModel.onComplete.add((sender) => this.alertResults(sender));
      });
   
  }
  onStepChange(event: any) {
    const newIndex = event.selectedIndex;
  
    // Allow going to current or previous steps only
    if (newIndex <= this.currentPageIndex) {
      this.surveyModel.currentPageNo = newIndex;
      this.currentPageIndex = newIndex;
    }
  }
}
