import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicityGameComponent } from './publicity-game.component';

describe('PublicityGameComponent', () => {
  let component: PublicityGameComponent;
  let fixture: ComponentFixture<PublicityGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicityGameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicityGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
