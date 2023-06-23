import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarServicioDisponibleDialogComponent } from './agregar-servicio-disponible-dialog.component';

describe('AgregarServicioDisponibleDialogComponent', () => {
  let component: AgregarServicioDisponibleDialogComponent;
  let fixture: ComponentFixture<AgregarServicioDisponibleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarServicioDisponibleDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarServicioDisponibleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
