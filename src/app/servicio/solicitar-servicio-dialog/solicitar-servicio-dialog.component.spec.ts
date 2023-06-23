import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitarServicioDialogComponent } from './solicitar-servicio-dialog.component';

describe('SolicitarServicioDialogComponent', () => {
  let component: SolicitarServicioDialogComponent;
  let fixture: ComponentFixture<SolicitarServicioDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitarServicioDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitarServicioDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
