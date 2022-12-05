import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSelectFormComponent } from './input-select-form.component';

describe('InputSelectFormComponent', () => {
  let component: InputSelectFormComponent;
  let fixture: ComponentFixture<InputSelectFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputSelectFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputSelectFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
