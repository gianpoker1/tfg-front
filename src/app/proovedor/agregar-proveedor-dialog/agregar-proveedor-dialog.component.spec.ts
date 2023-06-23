import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarProveedorDialogComponent } from './agregar-proveedor-dialog.component';

describe('AgregarProveedorDialogComponent', () => {
  let component: AgregarProveedorDialogComponent;
  let fixture: ComponentFixture<AgregarProveedorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarProveedorDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarProveedorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
