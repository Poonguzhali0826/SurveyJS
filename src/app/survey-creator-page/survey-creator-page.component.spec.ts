import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyCreatorPageComponent } from './survey-creator-page.component';

describe('SurveyCreatorPageComponent', () => {
  let component: SurveyCreatorPageComponent;
  let fixture: ComponentFixture<SurveyCreatorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SurveyCreatorPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurveyCreatorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
