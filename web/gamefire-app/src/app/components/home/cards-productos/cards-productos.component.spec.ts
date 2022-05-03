import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsProductosComponent } from './cards-productos.component';

describe('CardsProductosComponent', () => {
  let component: CardsProductosComponent;
  let fixture: ComponentFixture<CardsProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardsProductosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
