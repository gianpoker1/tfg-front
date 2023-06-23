import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitarServicioDisponibleDialogComponent } from './solicitar-servicio-disponible-dialog.component';

describe('SolicitarServicioDisponibleDialogComponent', () => {
  let component: SolicitarServicioDisponibleDialogComponent;
  let fixture: ComponentFixture<SolicitarServicioDisponibleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitarServicioDisponibleDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitarServicioDisponibleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
