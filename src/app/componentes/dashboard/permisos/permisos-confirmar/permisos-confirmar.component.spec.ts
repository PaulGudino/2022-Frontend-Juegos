import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermisosConfirmarComponent } from './permisos-confirmar.component';

describe('PermisosConfirmarComponent', () => {
  let component: PermisosConfirmarComponent;
  let fixture: ComponentFixture<PermisosConfirmarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermisosConfirmarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PermisosConfirmarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
