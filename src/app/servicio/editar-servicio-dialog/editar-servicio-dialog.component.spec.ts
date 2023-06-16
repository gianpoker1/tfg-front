import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarServicioDialogComponent } from './editar-servicio-dialog.component';

describe('EditarServicioDialogComponent', () => {
  let component: EditarServicioDialogComponent;
  let fixture: ComponentFixture<EditarServicioDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarServicioDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarServicioDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
