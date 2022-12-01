import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGameDateComponent } from './create-game-date.component';

describe('CreateGameDateComponent', () => {
  let component: CreateGameDateComponent;
  let fixture: ComponentFixture<CreateGameDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateGameDateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateGameDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
