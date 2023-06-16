import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCiudadDialogComponent } from './editar-ciudad-dialog.component';

describe('EditarCiudadDialogComponent', () => {
  let component: EditarCiudadDialogComponent;
  let fixture: ComponentFixture<EditarCiudadDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarCiudadDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarCiudadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
