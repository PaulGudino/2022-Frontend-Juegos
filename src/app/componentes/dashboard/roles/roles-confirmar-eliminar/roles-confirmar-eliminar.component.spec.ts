import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesConfirmarEliminarComponent } from './roles-confirmar-eliminar.component';

describe('RolesConfirmarEliminarComponent', () => {
  let component: RolesConfirmarEliminarComponent;
  let fixture: ComponentFixture<RolesConfirmarEliminarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RolesConfirmarEliminarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolesConfirmarEliminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
