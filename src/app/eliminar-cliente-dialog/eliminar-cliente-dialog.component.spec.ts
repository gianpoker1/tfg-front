import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarClienteDialogComponent } from './eliminar-cliente-dialog.component';

describe('EliminarClienteDialogComponent', () => {
  let component: EliminarClienteDialogComponent;
  let fixture: ComponentFixture<EliminarClienteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarClienteDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarClienteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
