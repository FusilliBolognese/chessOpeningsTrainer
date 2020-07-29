import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChessOpeningTrainingListComponent } from './opening-training-list.component';

describe('OpeningTrainingListComponent', () => {
  let component: ChessOpeningTrainingListComponent;
  let fixture: ComponentFixture<ChessOpeningTrainingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChessOpeningTrainingListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChessOpeningTrainingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
