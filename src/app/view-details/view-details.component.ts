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
