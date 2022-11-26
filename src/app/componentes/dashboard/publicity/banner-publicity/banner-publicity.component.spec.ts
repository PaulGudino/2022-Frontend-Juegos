import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerPublicityComponent } from './banner-publicity.component';

describe('BannerPublicityComponent', () => {
  let component: BannerPublicityComponent;
  let fixture: ComponentFixture<BannerPublicityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannerPublicityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannerPublicityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
