import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpeningTreeListComponent } from './opening-tree-list.component';

describe('OpeningTreeListComponent', () => {
  let component: OpeningTreeListComponent;
  let fixture: ComponentFixture<OpeningTreeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpeningTreeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpeningTreeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
