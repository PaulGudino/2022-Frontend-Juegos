import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAwardsConditionComponent } from './view-awards-condition.component';

describe('ViewAwardsConditionComponent', () => {
  let component: ViewAwardsConditionComponent;
  let fixture: ComponentFixture<ViewAwardsConditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAwardsConditionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAwardsConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
