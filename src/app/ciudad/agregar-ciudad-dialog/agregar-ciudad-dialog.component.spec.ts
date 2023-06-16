import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarCiudadDialogComponent } from './agregar-ciudad-dialog.component';

describe('AgregarCiudadDialogComponent', () => {
  let component: AgregarCiudadDialogComponent;
  let fixture: ComponentFixture<AgregarCiudadDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarCiudadDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarCiudadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
