import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorySetSquareItemComponent } from './category-set-square-item.component';

describe('CategorySetSquareItemComponent', () => {
  let component: CategorySetSquareItemComponent;
  let fixture: ComponentFixture<CategorySetSquareItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategorySetSquareItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategorySetSquareItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
