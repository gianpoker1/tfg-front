import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosSolicitadosAdminComponent } from './servicios-solicitados-admin.component';

describe('ServiciosSolicitadosAdminComponent', () => {
  let component: ServiciosSolicitadosAdminComponent;
  let fixture: ComponentFixture<ServiciosSolicitadosAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiciosSolicitadosAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiciosSolicitadosAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
