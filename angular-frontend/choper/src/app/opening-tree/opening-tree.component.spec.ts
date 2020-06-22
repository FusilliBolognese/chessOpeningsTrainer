import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpeningTreeComponent } from './opening-tree.component';

describe('OpeningTreeComponent', () => {
  let component: OpeningTreeComponent;
  let fixture: ComponentFixture<OpeningTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpeningTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpeningTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
