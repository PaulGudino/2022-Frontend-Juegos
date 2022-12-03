import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomPublicityComponent } from './bottom-publicity.component';

describe('BottomPublicityComponent', () => {
  let component: BottomPublicityComponent;
  let fixture: ComponentFixture<BottomPublicityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BottomPublicityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BottomPublicityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
