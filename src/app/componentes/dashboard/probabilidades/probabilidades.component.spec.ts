import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProbabilidadesComponent } from './probabilidades.component';

describe('ProbabilidadesComponent', () => {
  let component: ProbabilidadesComponent;
  let fixture: ComponentFixture<ProbabilidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProbabilidadesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProbabilidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
