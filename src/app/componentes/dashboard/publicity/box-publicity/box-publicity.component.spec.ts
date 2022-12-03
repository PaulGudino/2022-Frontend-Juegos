import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxPublicityComponent } from './box-publicity.component';

describe('BoxPublicityComponent', () => {
  let component: BoxPublicityComponent;
  let fixture: ComponentFixture<BoxPublicityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoxPublicityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoxPublicityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
