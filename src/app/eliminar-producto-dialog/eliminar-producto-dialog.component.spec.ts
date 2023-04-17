import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarProductoDialogComponent } from './eliminar-producto-dialog.component';

describe('EliminarProductoDialogComponent', () => {
  let component: EliminarProductoDialogComponent;
  let fixture: ComponentFixture<EliminarProductoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarProductoDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarProductoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
