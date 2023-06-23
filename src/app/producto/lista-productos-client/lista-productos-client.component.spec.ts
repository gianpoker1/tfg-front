import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaProductosClientComponent } from './lista-productos-client.component';

describe('ListaProductosClientComponent', () => {
  let component: ListaProductosClientComponent;
  let fixture: ComponentFixture<ListaProductosClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaProductosClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaProductosClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
