import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarProveedorDialogComponent } from './eliminar-proveedor-dialog.component';

describe('EliminarProveedorDialogComponent', () => {
  let component: EliminarProveedorDialogComponent;
  let fixture: ComponentFixture<EliminarProveedorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarProveedorDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarProveedorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
