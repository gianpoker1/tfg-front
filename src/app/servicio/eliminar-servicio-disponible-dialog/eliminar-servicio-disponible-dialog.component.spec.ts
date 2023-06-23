import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarServicioDisponibleDialogComponent } from './eliminar-servicio-disponible-dialog.component';

describe('EliminarServicioDisponibleDialogComponent', () => {
  let component: EliminarServicioDisponibleDialogComponent;
  let fixture: ComponentFixture<EliminarServicioDisponibleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarServicioDisponibleDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarServicioDisponibleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
