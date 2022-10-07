import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmacionEditarComponent } from './confirmacion-editar.component';

describe('ConfirmacionEditarComponent', () => {
  let component: ConfirmacionEditarComponent;
  let fixture: ComponentFixture<ConfirmacionEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmacionEditarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmacionEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
