import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputPasswordFormComponent } from './input-password-form.component';

describe('InputPasswordFormComponent', () => {
  let component: InputPasswordFormComponent;
  let fixture: ComponentFixture<InputPasswordFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputPasswordFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputPasswordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
