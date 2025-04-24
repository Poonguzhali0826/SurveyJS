import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-enquiry-list',
  standalone: true,
  imports: [CommonModule,HttpClientModule,MatIconModule],
  templateUrl: './enquiry-list.component.html',
  styleUrl: './enquiry-list.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class EnquiryListComponent implements OnInit{
  
  displayedColumns: string[] = [
    'clientName', 'email', 'phone', 'location',
    'garmentType', 'quantity', 'sizes', 'colors', 'fabricType',
    'printLocations', 'shippingAddress',
    'estimatedBudget', 'status', 'enquiryType'
  ];
  dataSource: any[] = [];
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:3000/api/survey').subscribe(data => {
      console.log('dataaaa', data);

      this.dataSource = data.map((item: any) => {
        const enquiryTypeRaw = item.data?.surveyCreatedUsing || 'Form';
        const enquiryType = enquiryTypeRaw.toLowerCase();

        // Check if required fields are filled (example logic)
        const requiredFields = ['clientName', 'email', 'phone', 'location', 'garmentType', 'quantity', 'sizes', 'colors', 'fabricType'];
        const isComplete = requiredFields.every(field => !!item.data[field]);
        return {
          ...item.data,
          status: isComplete ? 'Qualified Lead' : 'Enquiry',
          enquiryType: enquiryTypeRaw.charAt(0).toUpperCase() + enquiryTypeRaw.slice(1),
          submittedAt: item.submittedAt,
          id: item._id
        };
      });
    });
  }
  startEnquiry() {
    this.router.navigate(['/enquiry-form']);
  }
  viewDetails(id: string) {
    console.log('id', id);
    this.router.navigate(['/view-details'], { queryParams: { id } });
  }
  goBack() {
    this.router.navigate(['/enquiry-form']);
  }
}
