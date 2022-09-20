import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesConfirmarEditarComponent } from './roles-confirmar-editar.component';

describe('RolesConfirmarEditarComponent', () => {
  let component: RolesConfirmarEditarComponent;
  let fixture: ComponentFixture<RolesConfirmarEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RolesConfirmarEditarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolesConfirmarEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
