import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarServicioDialogComponent } from './agregar-servicio-dialog.component';

describe('AgregarServicioDialogComponent', () => {
  let component: AgregarServicioDialogComponent;
  let fixture: ComponentFixture<AgregarServicioDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarServicioDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarServicioDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
