import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuryDashboardComponent } from './jury-dashboard.component';

describe('JuryDashboardComponent', () => {
  let component: JuryDashboardComponent;
  let fixture: ComponentFixture<JuryDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JuryDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JuryDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
