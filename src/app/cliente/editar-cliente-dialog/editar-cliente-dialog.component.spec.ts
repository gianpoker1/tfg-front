import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarClienteDialogComponent } from './editar-cliente-dialog.component';

describe('EditarClienteDialogComponent', () => {
  let component: EditarClienteDialogComponent;
  let fixture: ComponentFixture<EditarClienteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarClienteDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarClienteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
