import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpeningTrainingListComponent } from './opening-training-list.component';

describe('OpeningTrainingListComponent', () => {
  let component: OpeningTrainingListComponent;
  let fixture: ComponentFixture<OpeningTrainingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpeningTrainingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpeningTrainingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
