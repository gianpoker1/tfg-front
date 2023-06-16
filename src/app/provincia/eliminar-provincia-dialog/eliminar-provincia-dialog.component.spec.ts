import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarProvinciaDialogComponent } from './eliminar-provincia-dialog.component';

describe('EliminarProvinciaDialogComponent', () => {
  let component: EliminarProvinciaDialogComponent;
  let fixture: ComponentFixture<EliminarProvinciaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarProvinciaDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarProvinciaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
