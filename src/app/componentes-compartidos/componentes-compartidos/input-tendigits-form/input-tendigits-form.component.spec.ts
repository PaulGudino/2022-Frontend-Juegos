import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTendigitsFormComponent } from './input-tendigits-form.component';

describe('InputTendigitsFormComponent', () => {
  let component: InputTendigitsFormComponent;
  let fixture: ComponentFixture<InputTendigitsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputTendigitsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputTendigitsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
