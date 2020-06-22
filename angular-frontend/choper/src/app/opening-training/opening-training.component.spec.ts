import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpeningTrainingComponent } from './opening-training.component';

describe('OpeningTrainingComponent', () => {
  let component: OpeningTrainingComponent;
  let fixture: ComponentFixture<OpeningTrainingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpeningTrainingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpeningTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
