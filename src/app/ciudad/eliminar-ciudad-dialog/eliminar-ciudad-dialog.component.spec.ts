import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarCiudadDialogComponent } from './eliminar-ciudad-dialog.component';

describe('EliminarCiudadDialogComponent', () => {
  let component: EliminarCiudadDialogComponent;
  let fixture: ComponentFixture<EliminarCiudadDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarCiudadDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarCiudadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
