import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarProvinciaDialogComponent } from './agregar-provincia-dialog.component';

describe('AgregarProvinciaDialogComponent', () => {
  let component: AgregarProvinciaDialogComponent;
  let fixture: ComponentFixture<AgregarProvinciaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarProvinciaDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarProvinciaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
