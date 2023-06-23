import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosDisponiblesAdminComponent } from './servicios-disponibles-admin.component';

describe('ServiciosDisponiblesAdminComponent', () => {
  let component: ServiciosDisponiblesAdminComponent;
  let fixture: ComponentFixture<ServiciosDisponiblesAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiciosDisponiblesAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiciosDisponiblesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
