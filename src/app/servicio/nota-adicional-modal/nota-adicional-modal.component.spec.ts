import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaAdicionalModalComponent } from './nota-adicional-modal.component';

describe('NotaAdicionalModalComponent', () => {
  let component: NotaAdicionalModalComponent;
  let fixture: ComponentFixture<NotaAdicionalModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotaAdicionalModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotaAdicionalModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
