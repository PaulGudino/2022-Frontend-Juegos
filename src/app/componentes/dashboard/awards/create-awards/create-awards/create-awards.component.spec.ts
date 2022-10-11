import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAwardsComponent } from './create-awards.component';

describe('CreateAwardsComponent', () => {
  let component: CreateAwardsComponent;
  let fixture: ComponentFixture<CreateAwardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAwardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAwardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
