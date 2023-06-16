import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarTrabajadorDialogComponent } from './editar-trabajador-dialog.component';

describe('EditarTrabajadorDialogComponent', () => {
  let component: EditarTrabajadorDialogComponent;
  let fixture: ComponentFixture<EditarTrabajadorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarTrabajadorDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarTrabajadorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
