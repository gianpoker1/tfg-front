import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarCompraDialogComponent } from './agregar-compra-dialog.component';

describe('AgregarCompraDialogComponent', () => {
  let component: AgregarCompraDialogComponent;
  let fixture: ComponentFixture<AgregarCompraDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarCompraDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarCompraDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
