import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChessOpeningTreeComponent } from './opening-tree.component';

describe('ChessOpeningTreeComponent', () => {
  let component: ChessOpeningTreeComponent;
  let fixture: ComponentFixture<ChessOpeningTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChessOpeningTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChessOpeningTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
