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
    const requiredFields = [
      'clientName',
      'email',
      'phone',
      'location',
      'garmentType',
      'quantity',
      'sizes',
      'colors',
      'fabricType'
    ];
    this.http.get<any[]>('http://localhost:3000/api/survey').subscribe(data => {
      const enrichedData = data.map(item => {
        const isComplete = requiredFields.every(field => !!item[field]);  // Check each field is truthy
        return {
          ...item,
          status: isComplete ? 'Qualified Lead' : 'Enquiry'
        };
      });
    
      console.log('Enriched data:', enrichedData);
      this.dataSource = enrichedData;
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
