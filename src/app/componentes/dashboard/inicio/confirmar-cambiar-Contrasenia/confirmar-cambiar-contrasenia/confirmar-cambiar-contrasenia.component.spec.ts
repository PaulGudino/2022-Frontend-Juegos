import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarCambiarContraseniaComponent } from './confirmar-cambiar-contrasenia.component';

describe('ConfirmarCambiarContraseniaComponent', () => {
  let component: ConfirmarCambiarContraseniaComponent;
  let fixture: ComponentFixture<ConfirmarCambiarContraseniaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmarCambiarContraseniaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmarCambiarContraseniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
