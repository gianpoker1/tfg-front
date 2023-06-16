import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarPaisDialogComponent } from './agregar-pais-dialog.component';

describe('AgregarPaisDialogComponent', () => {
  let component: AgregarPaisDialogComponent;
  let fixture: ComponentFixture<AgregarPaisDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarPaisDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarPaisDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
