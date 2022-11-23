import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAwardsConditionComponent } from './edit-awards-condition.component';

describe('EditAwardsConditionComponent', () => {
  let component: EditAwardsConditionComponent;
  let fixture: ComponentFixture<EditAwardsConditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAwardsConditionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAwardsConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
