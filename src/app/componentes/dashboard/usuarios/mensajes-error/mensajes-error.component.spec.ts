import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajesErrorComponent } from './mensajes-error.component';

describe('MensajesErrorComponent', () => {
  let component: MensajesErrorComponent;
  let fixture: ComponentFixture<MensajesErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MensajesErrorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MensajesErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
