import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TalleresAsistidosPage } from './talleres-asistidos.page';

describe('TalleresAsistidosPage', () => {
  let component: TalleresAsistidosPage;
  let fixture: ComponentFixture<TalleresAsistidosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TalleresAsistidosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
