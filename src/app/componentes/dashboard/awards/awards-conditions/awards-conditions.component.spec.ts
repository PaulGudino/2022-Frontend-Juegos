import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwardsConditionsComponent } from './awards-conditions.component';

describe('AwardsConditionsComponent', () => {
  let component: AwardsConditionsComponent;
  let fixture: ComponentFixture<AwardsConditionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AwardsConditionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AwardsConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
