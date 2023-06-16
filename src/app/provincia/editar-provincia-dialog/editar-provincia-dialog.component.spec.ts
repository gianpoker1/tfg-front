import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarProvinciaDialogComponent } from './editar-provincia-dialog.component';

describe('EditarProvinciaDialogComponent', () => {
  let component: EditarProvinciaDialogComponent;
  let fixture: ComponentFixture<EditarProvinciaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarProvinciaDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarProvinciaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
