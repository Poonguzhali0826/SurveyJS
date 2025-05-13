import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-view-details',
  standalone: true,
  imports: [CommonModule,HttpClientModule, MatCardModule,MatIconModule],
  templateUrl: './view-details.component.html',
  styleUrl: './view-details.component.scss'
})
export class ViewDetailsComponent {
  details: any;
  id: string = '';
  detailsData={
    "_id": "6809266c7f45a6590b03e398",
    "clientName": "Rohit Mehra",
    "companyName": "NovaCore Solutions",
    "email": "rohit.mehra@novacore.in",
    "phone": "+91-8899776655",
    "garmentType": "polo shirts",
    "quantity": "75",
    "sizes": "M, L, XL",
    "colors": "Charcoal Grey",
    "fabricType": "Polyester Blend",
    "hasDesign": "Yes",
    "needDesignHelp": "No",
    "printType": "Embroidery",
    "embroiderySize": "2.5 inches x 4 inches",
    "printLocations": [
      "Right sleeve",
      "front chest"
    ],
    "requireShipping": "Yes",
    "pickupPreference": "No",
    "estimatedBudget": "₹45,000",
    "surveyCreatedUsing": "Email",
    "address": "22 Innovation Plaza, Sector 62, Noida, Uttar Pradesh, 201301",
    "eventDeadline": "June 20th, 2025",
    "fileFormats": [
      "AI",
      "PNG",
      "EPS"
    ],
    "incoming_mail": [
      {
        "from": "rohit.mehra@novacore.in",
        "subject": "Custom polo shirt requirement",
        "date": "2025-04-28T10:32:00Z",
        "body": "Hi, we are interested in placing a bulk order of polo shirts for an upcoming corporate event. Please find the initial requirements attached."
      },
      {
        "from": "sales@garmentpro.in",
        "date": "2025-04-29T14:45:00Z",
        "body": "Thank you, Rohit. We’ve received your requirements. Could you please confirm the preferred fabric and upload any design files?"
      },
      {
        "from": "rohit.mehra@novacore.in",
        "date": "2025-04-30T09:10:00Z",
        "body": "We’ll go with the Polyester Blend fabric. I’ll share the logo in AI and PNG formats."
      }
    ]
  }
  
  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      if (this.id) {
        this.getSurveyDetails(this.id);
      }
    });
  }

  getSurveyDetails(id: string) {
    this.http.get<any>(`http://localhost:3000/api/survey/${id}`).subscribe({
      next: (res) => {
        this.details = res;
        console.log('Survey Detail:', this.details);
      },
      error: (err) => {
        console.error('Error fetching survey by ID:', err);
      }
    });
  }

  goBack() {
    this.router.navigate(['/enquiries-list']);
  }
}
