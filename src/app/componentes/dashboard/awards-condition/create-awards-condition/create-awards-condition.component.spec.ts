import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAwardsConditionComponent } from './create-awards-condition.component';

describe('CreateAwardsConditionComponent', () => {
  let component: CreateAwardsConditionComponent;
  let fixture: ComponentFixture<CreateAwardsConditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAwardsConditionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAwardsConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
