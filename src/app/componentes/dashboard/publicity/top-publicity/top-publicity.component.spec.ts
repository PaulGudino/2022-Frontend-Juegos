import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopPublicityComponent } from './top-publicity.component';

describe('TopPublicityComponent', () => {
  let component: TopPublicityComponent;
  let fixture: ComponentFixture<TopPublicityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopPublicityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopPublicityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
