import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAwardsComponent } from './view-awards.component';

describe('ViewAwardsComponent', () => {
  let component: ViewAwardsComponent;
  let fixture: ComponentFixture<ViewAwardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAwardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAwardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
