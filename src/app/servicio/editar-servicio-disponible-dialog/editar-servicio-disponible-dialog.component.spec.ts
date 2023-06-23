import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarServicioDisponibleDialogComponent } from './editar-servicio-disponible-dialog.component';

describe('EditarServicioDisponibleDialogComponent', () => {
  let component: EditarServicioDisponibleDialogComponent;
  let fixture: ComponentFixture<EditarServicioDisponibleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarServicioDisponibleDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarServicioDisponibleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
