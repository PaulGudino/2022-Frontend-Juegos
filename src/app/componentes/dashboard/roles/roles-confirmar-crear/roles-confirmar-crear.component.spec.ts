import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesConfirmarCrearComponent } from './roles-confirmar-crear.component';

describe('RolesConfirmarCrearComponent', () => {
  let component: RolesConfirmarCrearComponent;
  let fixture: ComponentFixture<RolesConfirmarCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RolesConfirmarCrearComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolesConfirmarCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
