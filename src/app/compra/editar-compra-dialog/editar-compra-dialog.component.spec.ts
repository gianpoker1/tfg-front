import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCompraDialogComponent } from './editar-compra-dialog.component';

describe('EditarCompraDialogComponent', () => {
  let component: EditarCompraDialogComponent;
  let fixture: ComponentFixture<EditarCompraDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarCompraDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarCompraDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
