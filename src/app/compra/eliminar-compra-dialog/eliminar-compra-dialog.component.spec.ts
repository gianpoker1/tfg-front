import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarCompraDialogComponent } from './eliminar-compra-dialog.component';

describe('EliminarCompraDialogComponent', () => {
  let component: EliminarCompraDialogComponent;
  let fixture: ComponentFixture<EliminarCompraDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarCompraDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarCompraDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
