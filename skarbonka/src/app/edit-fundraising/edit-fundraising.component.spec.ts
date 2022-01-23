import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EditFundraisingComponent} from './edit-fundraising.component';

describe('EditFundraisingComponent', () => {
  let component: EditFundraisingComponent;
  let fixture: ComponentFixture<EditFundraisingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFundraisingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFundraisingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
