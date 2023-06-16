import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarClienteDialogComponent } from './agregar-cliente-dialog.component';

describe('AgregarClienteDialogComponent', () => {
  let component: AgregarClienteDialogComponent;
  let fixture: ComponentFixture<AgregarClienteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarClienteDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarClienteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
