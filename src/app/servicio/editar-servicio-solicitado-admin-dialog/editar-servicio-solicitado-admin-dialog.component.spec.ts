import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarServicioSolicitadoAdminDialogComponent } from './editar-servicio-solicitado-admin-dialog.component';

describe('EditarServicioSolicitadoAdminDialogComponent', () => {
  let component: EditarServicioSolicitadoAdminDialogComponent;
  let fixture: ComponentFixture<EditarServicioSolicitadoAdminDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarServicioSolicitadoAdminDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarServicioSolicitadoAdminDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
