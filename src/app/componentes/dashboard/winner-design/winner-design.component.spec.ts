import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WinnerDesignComponent } from './winner-design.component';

describe('WinnerDesignComponent', () => {
  let component: WinnerDesignComponent;
  let fixture: ComponentFixture<WinnerDesignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WinnerDesignComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WinnerDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
