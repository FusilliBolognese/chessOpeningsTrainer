import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChessOpeningTrainingEditComponent } from './opening-training-edit.component';

describe('ChessOpeningTrainingComponent', () => {
  let component: ChessOpeningTrainingEditComponent;
  let fixture: ComponentFixture<ChessOpeningTrainingEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChessOpeningTrainingEditComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChessOpeningTrainingEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
