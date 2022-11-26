import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonGameComponent } from './button-game.component';

describe('ButtonGameComponent', () => {
  let component: ButtonGameComponent;
  let fixture: ComponentFixture<ButtonGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonGameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
