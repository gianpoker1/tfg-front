import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarServicioDialogComponent } from './eliminar-servicio-dialog.component';

describe('EliminarServicioDialogComponent', () => {
  let component: EliminarServicioDialogComponent;
  let fixture: ComponentFixture<EliminarServicioDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarServicioDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarServicioDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
