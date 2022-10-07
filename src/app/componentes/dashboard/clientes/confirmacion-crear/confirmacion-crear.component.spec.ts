import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmacionCrearComponent } from './confirmacion-crear.component';

describe('ConfirmacionCrearComponent', () => {
  let component: ConfirmacionCrearComponent;
  let fixture: ComponentFixture<ConfirmacionCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmacionCrearComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmacionCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
