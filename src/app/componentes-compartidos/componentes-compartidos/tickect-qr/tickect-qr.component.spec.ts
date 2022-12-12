import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TickectQRComponent } from './tickect-qr.component';

describe('TickectQRComponent', () => {
  let component: TickectQRComponent;
  let fixture: ComponentFixture<TickectQRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TickectQRComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TickectQRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
