import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarPaisDialogComponent } from './eliminar-pais-dialog.component';

describe('EliminarPaisDialogComponent', () => {
  let component: EliminarPaisDialogComponent;
  let fixture: ComponentFixture<EliminarPaisDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarPaisDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarPaisDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
