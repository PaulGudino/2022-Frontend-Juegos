import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwardsConditionComponent } from './awards-condition.component';

describe('AwardsConditionComponent', () => {
  let component: AwardsConditionComponent;
  let fixture: ComponentFixture<AwardsConditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AwardsConditionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AwardsConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
