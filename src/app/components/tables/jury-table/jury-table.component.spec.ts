import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuryTableComponent } from './jury-table.component';

describe('JuryTableComponent', () => {
  let component: JuryTableComponent;
  let fixture: ComponentFixture<JuryTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JuryTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JuryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
