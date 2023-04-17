import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarTrabajadorDialogComponent } from './eliminar-trabajador-dialog.component';

describe('EliminarTrabajadorDialogComponent', () => {
  let component: EliminarTrabajadorDialogComponent;
  let fixture: ComponentFixture<EliminarTrabajadorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarTrabajadorDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarTrabajadorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
