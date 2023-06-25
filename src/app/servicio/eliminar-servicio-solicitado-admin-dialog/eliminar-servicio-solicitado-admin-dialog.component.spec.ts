import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarServicioSolicitadoAdminDialogComponent } from './eliminar-servicio-solicitado-admin-dialog.component';

describe('EliminarServicioSolicitadoAdminDialogComponent', () => {
  let component: EliminarServicioSolicitadoAdminDialogComponent;
  let fixture: ComponentFixture<EliminarServicioSolicitadoAdminDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarServicioSolicitadoAdminDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarServicioSolicitadoAdminDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
