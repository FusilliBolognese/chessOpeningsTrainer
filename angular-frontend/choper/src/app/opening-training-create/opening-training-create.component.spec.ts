import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChessOpeningTrainingCreateComponent } from './opening-training-create.component';

describe('OpeningTrainingCreateComponent', () => {
  let component: ChessOpeningTrainingCreateComponent;
  let fixture: ComponentFixture<ChessOpeningTrainingCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChessOpeningTrainingCreateComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChessOpeningTrainingCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
