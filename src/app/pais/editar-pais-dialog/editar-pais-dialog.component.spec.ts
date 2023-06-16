import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPaisDialogComponent } from './editar-pais-dialog.component';

describe('EditarPaisDialogComponent', () => {
  let component: EditarPaisDialogComponent;
  let fixture: ComponentFixture<EditarPaisDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarPaisDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarPaisDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
